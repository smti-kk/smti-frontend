import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MunicipalitiesLayer, MunicipalitiesLayerGeoJson } from '@map-wrapper/layers/municipalities-layer';
import { AdministrativeCenterPoint } from '@map-wrapper/model/administrative-center-point';
import { AdministrativeCentersLayer } from '@map-wrapper/layers/administrative-centers-layer';
import { TIMER_INTERVAL } from '@map-wrapper/components/access-point-layer';
import { ExtendedMap } from '../../../declarations/leaflet';
import { LocationCapabilitiesService } from '../../../shared/services/location-capabilities.service';
import { Subscription } from 'rxjs';
import { LocationCapabilities } from '../../../shared/models/location-capabilities';
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
export class LocationCapabilitiesSearchComponent implements OnDestroy, OnInit {
  @Input() private readonly leafletMap: ExtendedMap;
  @Output() selectedPoint: EventEmitter<LocationCapabilities> = new EventEmitter<LocationCapabilities>();

  administrativePoints: AdministrativeCenterPoint[] = [];
  searchForm: FormGroup;
  observers: Subscription[] = [];

  private technicalCapabilitiesUpdateTimer: number;

  constructor(private readonly fb: FormBuilder,
              private locationCapabilitiesService: LocationCapabilitiesService,
              private administrativeCentersLayer: AdministrativeCentersLayer,
              public municipalityLayer: MunicipalitiesLayer) {
    this.searchForm = this.buildForm();

    municipalityLayer.onMunicipalityClick.subscribe(layer => {
      this.searchForm.get(FORM_PARAMS.area).patchValue(layer);
    });

    const observer = this.handleMarkerClick();

    this.observers.push(observer);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.observers.forEach(observer => observer.unsubscribe());

    if (this.technicalCapabilitiesUpdateTimer) {
      window.clearInterval(this.technicalCapabilitiesUpdateTimer);
    }
  }

  onSearchSubmit() {
    if (this.administrativePoints.length > 0) {
      const selectedPoint = this.administrativePoints[0];

      this.administrativePoints = [];

      this.setSelectedPoint(selectedPoint, true);

      this.searchForm.get(FORM_PARAMS.locality).patchValue(selectedPoint.name);
    }
  }

  setSelectedPoint(administrativePoint: AdministrativeCenterPoint, animate: boolean) {
    this.searchForm.get(FORM_PARAMS.locality).setValue(administrativePoint.name);

    this.leafletMap.flyTo(new LatLng(administrativePoint.point.lat, administrativePoint.point.lng), ZOOM, {animate});

    this.leafletMap.spin(true);
    this.locationCapabilitiesService.get(administrativePoint.id).subscribe(lc => {
      this.selectedPoint.emit(lc);
      this.leafletMap.spin(false);
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

    this.administrativeCentersLayer.filterByArea(selectedArea);
  }

  private handleMarkerClick() {

    return this.administrativeCentersLayer
      .onMarkerClick
      .subscribe((marker: AccessPointMarker<AdministrativeCenterPoint>) => {
        this.onMunicipalityMarkerClick(marker);

        if (this.technicalCapabilitiesUpdateTimer) {
          window.clearInterval(this.technicalCapabilitiesUpdateTimer);
        }

        this.technicalCapabilitiesUpdateTimer = window.setInterval(() => {
          this.locationCapabilitiesService.get(marker.feature.properties.point.id).subscribe(location => {
            this.selectedPoint.emit(location);
          });
        }, TIMER_INTERVAL);
      });
  }

  private buildForm(): FormGroup {
    const form = this.fb.group({
      [FORM_PARAMS.area]: [this.municipalityLayer.selectedLocation ? this.municipalityLayer.selectedLocation : null],
      [FORM_PARAMS.locality]: ['']
    });

    form.get(FORM_PARAMS.area).valueChanges.subscribe(selectedArea => this.selectArea(selectedArea));
    form.get(FORM_PARAMS.locality).valueChanges.subscribe(locality => this.filterLocalities(locality));

    if (!form.get(FORM_PARAMS.area).value) {
      form.get(FORM_PARAMS.locality).disable();
    }

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

  private onMunicipalityMarkerClick(marker: AccessPointMarker<AdministrativeCenterPoint>) {
    this.searchForm.get(FORM_PARAMS.area).patchValue(this.municipalityLayer.getLayerByAreaName(marker.feature.properties.point.area));
    this.setSelectedPoint(marker.feature.properties.point, true);
  }
}
