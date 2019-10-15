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

    layersService.getMunicipalities().subscribe(m => this.locations = m.getLayers());
    this.onSearchFormChanges();
  }

  ngOnInit() {
    this.layersService.getAdministrativeCenters().onMarkerClick.subscribe((marker: Marker) => {
      this.locationCapabilitiesService.getById(marker.feature.properties.id).subscribe(location => {
        this.currentPointCapabilities = location;

        this.ref.detectChanges();

        this.searchForm.setValue({
          area: this.layersService.getPointArea(marker),
          locality: marker.feature.properties.name
        });
      });
    });
  }

  onSearchFormChanges() {
    this.searchForm.get('area').valueChanges.subscribe(selectedArea => this.selectArea(selectedArea));
    this.searchForm.get('locality').valueChanges.subscribe(locality => this.filterLocalities(locality));
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

  private toggleClass(item: Element, clazz: any) {
    const hasClass = item.classList.contains(clazz);

    if (hasClass) {
      this.renderer.removeClass(item, clazz);
    } else {
      this.renderer.addClass(item, clazz);
    }
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
    }

    this.lastActiveLocation = selectedArea;
  }

  private filterLocalities(locality: string) {
    if (this.administrativePoints) {
      this.searchAdministrativePoints = this.administrativePoints.filter(ap => ap.name.includes(locality));
    }
  }
}
