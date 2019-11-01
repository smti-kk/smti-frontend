import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MunicipalitiesLayer, MunicipalitiesLayerGeoJson } from '@map-wrapper/layers/municipalities-layer';
import { AdministrativeCenterPoint } from '@map-wrapper/model/administrative-center-point';
import { AdministrativeCentersLayer } from '@map-wrapper/layers/administrative-centers-layer';
import { TIMER_INTERVAL } from '@map-wrapper/components/access-point-layer';
import { ExtendedMap } from '../../../declarations/leaflet';
import { LocationCapabilitiesService } from '../../../shared/services/location-capabilities.service';
import { Observable } from 'rxjs';
import { LocationCapabilities } from '../../../shared/models/location-capabilities';
import { tap } from 'rxjs/operators';
import { AccessPointMarker } from '@map-wrapper/components/access-point-marker';
import { LatLng } from 'leaflet';

const FORM_PARAMS = {
  area: 'area',
  locality: 'locality'
};

const ZOOM = 14;

@Component({
  selector: 'location-capabilities-search',
  templateUrl: './location-capabilities-search.component.html',
  styleUrls: ['./location-capabilities-search.component.scss']
})
export class LocationCapabilitiesSearchComponent implements OnInit {
  @Input() private readonly leafletMap: ExtendedMap;
  @Output() selectedPoint: EventEmitter<LocationCapabilities> = new EventEmitter<LocationCapabilities>();

  administrativePoints: AdministrativeCenterPoint[] = [];
  searchForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private locationCapabilitiesService: LocationCapabilitiesService,
              private administrativeCentersLayer: AdministrativeCentersLayer,
              public municipalityLayer: MunicipalitiesLayer) {
    this.searchForm = this.buildForm();

    municipalityLayer.onMunicipalityClick.subscribe(layer => {
      this.searchForm.get(FORM_PARAMS.area).patchValue(layer);
    });

    let interval;
    this.administrativeCentersLayer
      .onMarkerClick
      .subscribe((marker: AccessPointMarker<AdministrativeCenterPoint>) => {
        this.leafletMap.spin(true);
        this.onMunicipalityMarkerClick(marker).subscribe(() => this.leafletMap.spin(false));

        if (interval) {
          window.clearInterval(interval);
        }

        interval = window.setInterval(() => {
          this.locationCapabilitiesService.get(marker.feature.properties.point.id).subscribe(location => {
            this.selectedPoint.emit(location);
          });
        }, TIMER_INTERVAL);
      });
  }

  ngOnInit() {

  }

  onSearchSubmit() {
    if (this.administrativePoints.length > 0) {
      const selectedPoint = this.administrativePoints[0];
      this.administrativePoints = [];
      this.setSelectedPoint(selectedPoint);
      this.searchForm.get(FORM_PARAMS.locality).patchValue(selectedPoint.name);
    }
  }

  setSelectedPoint(administrativePoint: AdministrativeCenterPoint) {
    this.searchForm.get(FORM_PARAMS.locality).setValue(administrativePoint.name);
    this.leafletMap.flyTo(new LatLng(administrativePoint.point.lat, administrativePoint.point.lng), ZOOM);
    this.locationCapabilitiesService.get(administrativePoint.id).subscribe(lc => {
      this.selectedPoint.emit(lc);
    });
  }

  private selectArea(selectedArea: MunicipalitiesLayerGeoJson) {
    this.municipalityLayer.selectLayer(selectedArea);

    if (selectedArea) {
      this.searchForm.get(FORM_PARAMS.locality).enable();
    } else {
      this.searchForm.get(FORM_PARAMS.locality).disable();
      this.administrativeCentersLayer.filterByArea(null);
    }

    this.searchForm.get(FORM_PARAMS.locality).reset('');

    this.administrativeCentersLayer.filterByArea(selectedArea).then(() => {
      // this.administrativePoints = this.administrativeCentersLayer
      //   .filterByLocalityName(this.searchForm.get(FORM_PARAMS.locality).value);
    });
  }

  private buildForm(): FormGroup {
    const form = this.fb.group({
      [FORM_PARAMS.area]: [null],
      [FORM_PARAMS.locality]: ['']
    });

    form.get(FORM_PARAMS.area).valueChanges.subscribe(selectedArea => this.selectArea(selectedArea));
    form.get(FORM_PARAMS.locality).valueChanges.subscribe(locality => this.filterLocalities(locality));
    form.get(FORM_PARAMS.locality).disable();

    return form;
  }

  private filterLocalities(locality: string) {
    if (this.administrativeCentersLayer) {
      this.administrativePoints = this.administrativeCentersLayer.filterByLocalityName(locality);
      if (this.administrativePoints.length === 1 && this.administrativePoints[0].name === locality) {
        this.administrativePoints = [];
      }
    }
  }

  private onMunicipalityMarkerClick(marker: AccessPointMarker<AdministrativeCenterPoint>): Observable<LocationCapabilities> {
    this.searchForm.get(FORM_PARAMS.area).patchValue(this.municipalityLayer.getLayerByAreaName(marker.feature.properties.point.area));
    this.searchForm.get([FORM_PARAMS.locality]).patchValue(marker.feature.properties.point.name);

    return this.locationCapabilitiesService.get(marker.feature.properties.point.id)
      .pipe(tap(location => {
        this.selectedPoint.emit(location);
      }));
  }
}
