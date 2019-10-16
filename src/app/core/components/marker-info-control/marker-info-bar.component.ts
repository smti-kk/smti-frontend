import { ChangeDetectorRef, Component, Input, OnInit, Renderer2 } from '@angular/core';
import { LocationCapabilities } from '../../../shared/model/LocationCapabilities';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Map, Marker } from 'leaflet';
import { LocationCapabilitiesService } from '../../../shared/services/location-capabilities.service';
import { HIGHLIGHT_FEATURE, MAP_TERRITORIES_STYLE } from '@map-wrapper/constants/inline.style';
import { LayersService } from '@map-wrapper/service/layers.service';
import AdministrativeCenterPoint from '@map-wrapper/model/administrative-center-point';

@Component({
  selector: 'marker-info-bar',
  templateUrl: './marker-info-bar.component.html',
  styleUrls: ['./marker-info-bar.component.scss']
})
export class MarkerInfoBarComponent implements OnInit {

  @Input() leafletMap: Map;
  locations: any[];
  lastActiveLocation;
  searchForm: FormGroup;
  currentPointCapabilities: LocationCapabilities;
  administrativePoints: AdministrativeCenterPoint[];
  searchAdministrativePoints: AdministrativeCenterPoint[] = [];

  constructor(private fb: FormBuilder,
              private locationCapabilitiesService: LocationCapabilitiesService,
              private layersService: LayersService,
              private ref: ChangeDetectorRef,
              private renderer: Renderer2) {
    this.searchForm = this.fb.group({
      area: [null, Validators.required],
      locality: ['']
    });

    this.searchForm.get('locality').disable();

    layersService.municipalitiesLayer.subscribe(m => {
      this.locations = m.getLayers().sort(MarkerInfoBarComponent.sortByAreaName());
    });

    this.onSearchFormChanges();
  }

  ngOnInit() {
    this.layersService.getAdministrativeCenters().onMarkerClick.subscribe((marker: Marker) => {
      this.locationCapabilitiesService.getById(marker.feature.properties.id).subscribe(location => {
        this.currentPointCapabilities = location;

        this.searchAdministrativePoints = [];

        this.searchForm.setValue({
          area: this.locations.find((ml: any) => ml.feature.properties.name === marker.feature.properties.area),
          locality: marker.feature.properties.name
        });

        this.ref.detectChanges();
      });
    });
  }

  openAccordion($event, clazz) {
    if ($event.target.classList.contains('accordion-title')) {
      this.toggleClass($event.target.nextElementSibling, clazz);
      this.toggleClass($event.target.lastElementChild, clazz);
    } else {
      this.toggleClass($event.target.parentNode.lastElementChild, clazz);
      this.toggleClass($event.target.parentNode.nextElementSibling, clazz);
    }
  }

  setSelectedPoint(point: AdministrativeCenterPoint) {
    this.locationCapabilitiesService.getById(point.pk).subscribe(location => {
      this.currentPointCapabilities = location;
      this.ref.detectChanges();
    });

    this.leafletMap.flyTo(this.layersService.getAdministrativeMarker(point).getLatLng(), 18);

    this.searchForm.get('locality').reset(point.name);

    this.searchAdministrativePoints = [];
  }

  onSearchSubmit() {
    if (this.searchAdministrativePoints.length > 0) {
      this.searchForm.get('locality').patchValue(this.searchAdministrativePoints[0].name);
    }
  }

  hasProvider(telephone: any[]) {
    return telephone.find(t => t.provider.isActive === true);
  }

  private toggleClass(item: Element, clazz: any) {
    const hasClass = item.classList.contains(clazz);

    if (hasClass) {
      this.renderer.removeClass(item, clazz);
    } else {
      this.renderer.addClass(item, clazz);
    }
  }

  private onSearchFormChanges() {
    this.searchForm.get('area').valueChanges.subscribe(selectedArea => {
      if (selectedArea) {
        this.searchForm.get('locality').enable();
      } else {
        this.searchForm.get('locality').disable();
      }
      this.selectArea(selectedArea);
    });
    this.searchForm.get('locality').valueChanges.subscribe(locality => this.filterLocalities(locality));
  }

  private selectArea(selectedArea: any) {
    if (this.lastActiveLocation) {
      this.lastActiveLocation.setStyle(MAP_TERRITORIES_STYLE);
    }

    this.searchAdministrativePoints = [];
    this.searchForm.get('locality').reset('');
    this.administrativePoints = this.layersService.getAdministrativePointsByArea(selectedArea);

    if (selectedArea) {
      selectedArea.setStyle(HIGHLIGHT_FEATURE);
      selectedArea.bringToFront();

      if (this.lastActiveLocation !== selectedArea) {
        this.leafletMap.fitBounds(selectedArea.getBounds());
      }
    } else {
      this.currentPointCapabilities = null;
    }

    this.lastActiveLocation = selectedArea;
  }

  private filterLocalities(locality: string) {
    if (this.administrativePoints) {
      this.searchAdministrativePoints = this.administrativePoints.filter(ap => ap.name.includes(locality) && ap.name !== locality);
      this.ref.detectChanges();
    }
  }

  static sortByAreaName() {
    return (layer1: any, layer2: any) => {
      if (layer1.feature.properties.name < layer2.feature.properties.name) {
        return -1;
      }
      if (layer1.feature.properties.name > layer2.feature.properties.name) {
        return 1;
      }
      return 0;
    };
  }
}
