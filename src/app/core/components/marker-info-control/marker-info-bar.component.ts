import { ChangeDetectorRef, Component, Input, OnInit, Renderer2 } from '@angular/core';
import { LocationCapabilities, Telephone } from '../../../shared/models/LocationCapabilities';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Marker } from 'leaflet';
import { LocationCapabilitiesService } from '../../../shared/services/location-capabilities.service';
import { LayersService } from '@map-wrapper/service/layers.service';
import { AdministrativeCenterPoint } from '@map-wrapper/model/administrative-center-point';
import { MunicipalitiesLayer, MunicipalitiesLayerGeoJson } from '@map-wrapper/municipalities-layer';
import { TIMER_INTERVAL } from '@map-wrapper/components/access-point-layer';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ExtendedMap } from '../../../declarations/leaflet';

const FORM_PARAMS = {
  area: 'area',
  locality: 'locality'
};

const MAP_ZOOM = 18;

@Component({
  selector: 'marker-info-bar',
  templateUrl: './marker-info-bar.component.html',
  styleUrls: ['./marker-info-bar.component.scss']
})
export class MarkerInfoBarComponent implements OnInit {

  @Input() leafletMap: ExtendedMap;

  readonly searchForm: FormGroup;

  private municipalityLayer: MunicipalitiesLayer;
  private administrativePoints: AdministrativeCenterPoint[];

  locations: MunicipalitiesLayerGeoJson[];
  currentPointCapabilities: LocationCapabilities;
  searchAdministrativePoints: AdministrativeCenterPoint[] = [];


  constructor(private readonly fb: FormBuilder,
              private readonly locationCapabilitiesService: LocationCapabilitiesService,
              private readonly layersService: LayersService,
              private readonly ref: ChangeDetectorRef,
              private readonly renderer: Renderer2) {
    this.searchForm = this.fb.group({
      [FORM_PARAMS.area]: [null],
      [FORM_PARAMS.locality]: ['']
    });

    layersService.municipalitiesLayer.subscribe(m => {
      this.setClickEmitter(m);
      this.municipalityLayer = m;
      this.locations = m.getLayers();
    });

    this.onSearchFormChanges();

  }

  ngOnInit() {
    let interval;

    this.searchForm.get(FORM_PARAMS.locality).disable();
    this.layersService.getAdministrativeCenters()
      .onMarkerClick
      .subscribe((marker: Marker) => {
        this.leafletMap.spin(true);
        this.onMunicipalityMarkerClick(marker).subscribe(() => this.leafletMap.spin(false));

        if (interval) {
          window.clearInterval(interval);
        }

        interval = window.setInterval(() => {
          this.locationCapabilitiesService.get(marker.feature.properties.point.pk).subscribe(location => {
            this.currentPointCapabilities = location;
            this.ref.detectChanges();
          });
        }, TIMER_INTERVAL);
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
    this.locationCapabilitiesService.get(point.pk).subscribe(location => {
      this.currentPointCapabilities = location;
      this.ref.detectChanges();
    });

    this.leafletMap.flyTo(this.layersService.getAdministrativeMarker(point).getLatLng(), MAP_ZOOM);

    this.searchForm.get(FORM_PARAMS.locality).reset(point.name);

    this.searchAdministrativePoints = [];
  }

  onSearchSubmit() {
    if (this.searchAdministrativePoints.length > 0) {
      this.searchForm.get(FORM_PARAMS.locality).patchValue(this.searchAdministrativePoints[0].name);
    }
  }

  hasProvider(telephone: Telephone[]) {
    return telephone.find(t => t.provider.isActive === true);
  }


  private toggleClass(item: Element, clazz: string) {
    const hasClass = item.classList.contains(clazz);

    if (hasClass) {
      this.renderer.removeClass(item, clazz);
    } else {
      this.renderer.addClass(item, clazz);
    }
  }

  private onSearchFormChanges() {
    this.searchForm.get(FORM_PARAMS.area).valueChanges.subscribe(selectedArea => this.selectArea(selectedArea));
    this.searchForm.get(FORM_PARAMS.locality).valueChanges.subscribe(locality => this.filterLocalities(locality));
  }

  private selectArea(selectedArea: MunicipalitiesLayerGeoJson) {
    this.municipalityLayer.selectLayer(selectedArea, this.leafletMap);

    if (selectedArea) {
      this.searchForm.get(FORM_PARAMS.locality).enable();
    } else {
      this.currentPointCapabilities = null;
      this.searchForm.get(FORM_PARAMS.locality).disable();
    }

    this.searchAdministrativePoints = [];
    this.searchForm.get(FORM_PARAMS.locality).reset('');
    this.administrativePoints = this.layersService.getAdministrativePoints(selectedArea);
  }

  private filterLocalities(locality: string) {
    if (this.administrativePoints) {
      this.searchAdministrativePoints = this.administrativePoints.filter(ap => ap.name.includes(locality) && ap.name !== locality);
      this.ref.detectChanges();
    }
  }

  private setClickEmitter(m: MunicipalitiesLayer) {
    m.onMunicipalityClick.subscribe(layer => {
      this.searchForm.get(FORM_PARAMS.area).patchValue(layer);
    });
  }

  private onMunicipalityMarkerClick(marker: Marker): Observable<LocationCapabilities> {
    return this.locationCapabilitiesService.get(marker.feature.properties.point.pk)
      .pipe(tap(location => {
        this.currentPointCapabilities = location;

        this.searchAdministrativePoints = [];

        this.searchForm.setValue({
          area: this.locations.find((ml) => ml.feature.properties.name === marker.feature.properties.point.area),
          locality: marker.feature.properties.point.name
        });
      }));
  }
}
