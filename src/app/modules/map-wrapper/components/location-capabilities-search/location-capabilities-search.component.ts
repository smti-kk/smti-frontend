import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {LatLng, Map} from 'leaflet';

import {TIMER_INTERVAL} from '@core/utils/updated-list';

import {MunicipalitiesLayer, MunicipalitiesLayerGeoJson} from '../../layers/municipalities-layer';
import {AdministrativeCenterPoint} from '../../model/administrative-center-point';
import {AdministrativeCentersLayer} from '../../layers/administrative-centers-layer';
import {MonitoringMarker} from '../monitoring-marker';

const FORM_PARAMS = {
  area: 'area',
  locality: 'locality',
};

const ZOOM = 14;

@Component({
  selector: 'location-capabilities-search',
  templateUrl: './location-capabilities-search.component.html',
  styleUrls: ['./location-capabilities-search.component.scss'],
})
export class LocationCapabilitiesSearchComponent implements OnDestroy {
  @Input() private readonly leafletMap: Map;

  @Output() selectedPoint: EventEmitter<number> = new EventEmitter<number>();

  administrativePoints: AdministrativeCenterPoint[] = [];

  searchForm: FormGroup;

  observers: Subscription[] = [];

  private technicalCapabilitiesUpdateTimer: number;

  constructor(
    private readonly fb: FormBuilder,
    private administrativeCentersLayer: AdministrativeCentersLayer,
    public municipalityLayer: MunicipalitiesLayer
  ) {
    this.searchForm = this.buildForm();

    municipalityLayer.onMunicipalityClick.subscribe(layer => {
      this.searchForm.get(FORM_PARAMS.area).setValue(layer);
    });

    const observer = this.handleMarkerClick();

    this.observers.push(observer);
  }

  ngOnDestroy(): void {
    this.observers.forEach(observer => observer.unsubscribe());

    if (this.technicalCapabilitiesUpdateTimer) {
      window.clearInterval(this.technicalCapabilitiesUpdateTimer);
    }
  }

  onSearchSubmit(): void {
    if (this.administrativePoints.length > 0) {
      const selectedPoint = this.administrativePoints[0];

      this.administrativePoints = [];

      this.setSelectedPoint(selectedPoint, true);

      this.searchForm.get(FORM_PARAMS.locality).patchValue(selectedPoint.fullName);
    }
  }

  setSelectedPoint(administrativePoint: AdministrativeCenterPoint, animate = true): void {
    this.searchForm.get(FORM_PARAMS.locality).setValue(administrativePoint.fullName);
    this.leafletMap.flyTo(
      new LatLng(administrativePoint.point.lat, administrativePoint.point.lng),
      ZOOM,
      {animate}
    );
    this.selectedPoint.emit(administrativePoint.id);
  }

  private selectArea(selectedArea: MunicipalitiesLayerGeoJson): void {
    this.municipalityLayer.selectLayer(selectedArea);

    if (selectedArea) {
      this.searchForm.get(FORM_PARAMS.locality).enable();
    } else {
      this.searchForm.get(FORM_PARAMS.locality).disable();
      this.administrativeCentersLayer.filterByArea(null);
    }

    this.searchForm.get(FORM_PARAMS.locality).reset('');

    this.administrativeCentersLayer.filterByArea(selectedArea);
  }

  private handleMarkerClick(): Subscription {
    return this.administrativeCentersLayer.onMarkerClick.subscribe(
      (marker: MonitoringMarker<AdministrativeCenterPoint>) => {
        this.onMunicipalityMarkerClick(marker);

        if (this.technicalCapabilitiesUpdateTimer) {
          window.clearInterval(this.technicalCapabilitiesUpdateTimer);
        }

        this.technicalCapabilitiesUpdateTimer = window.setInterval(() => {
          this.selectedPoint.emit(marker.feature.properties.id);
        }, TIMER_INTERVAL);
      }
    );
  }

  private buildForm(): FormGroup {
    const form = this.fb.group({
      [FORM_PARAMS.area]: [
        this.municipalityLayer.selectedLocation ? this.municipalityLayer.selectedLocation : null,
      ],
      [FORM_PARAMS.locality]: [''],
    });

    form
      .get(FORM_PARAMS.area)
      .valueChanges.subscribe(selectedArea => this.selectArea(selectedArea));
    form
      .get(FORM_PARAMS.locality)
      .valueChanges.subscribe(locality => this.filterLocalities(locality));

    if (!form.get(FORM_PARAMS.area).value) {
      form.get(FORM_PARAMS.locality).disable();
    }

    return form;
  }

  private filterLocalities(locality: string): void {
    if (this.administrativeCentersLayer) {
      this.administrativePoints = this.administrativeCentersLayer.filterByLocalityName(locality);
      if (
        this.administrativePoints.length === 1 &&
        this.administrativePoints[0].fullName === locality
      ) {
        this.administrativePoints = [];
      }
    }
  }

  private onMunicipalityMarkerClick(marker: MonitoringMarker<AdministrativeCenterPoint>): void {
    this.searchForm
      .get(FORM_PARAMS.area)
      .patchValue(this.municipalityLayer.getLayerByAreaName(marker.feature.properties.district));
    this.setSelectedPoint(marker.feature.properties, true);
  }
}
