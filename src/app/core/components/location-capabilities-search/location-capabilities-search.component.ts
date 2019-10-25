import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MunicipalitiesLayer, MunicipalitiesLayerGeoJson } from '@map-wrapper/municipalities-layer';
import { AdministrativeCenterPoint } from '@map-wrapper/model/administrative-center-point';
import { LayersService } from '@map-wrapper/service/layers.service';
import { Map } from 'leaflet';

const FORM_PARAMS = {
  area: 'area',
  locality: 'locality'
};

@Component({
  selector: 'location-capabilities-search',
  templateUrl: './location-capabilities-search.component.html',
  styleUrls: ['./location-capabilities-search.component.scss']
})
export class LocationCapabilitiesSearchComponent implements OnInit {
  @Input() private readonly leafletMap: Map;
  @Output() point: EventEmitter<AdministrativeCenterPoint> = new EventEmitter<AdministrativeCenterPoint>();

  locations: MunicipalitiesLayerGeoJson[];
  administrativePoints: AdministrativeCenterPoint[] = [];

  readonly searchForm: FormGroup;
  private municipalityLayer: MunicipalitiesLayer;

  constructor(private readonly layersService: LayersService,
              private readonly fb: FormBuilder) {
    this.searchForm = this.buildForm();

    layersService.municipalitiesLayer.subscribe(m => {
      this.municipalityLayer = m;
      this.locations = m.getLayers();
    });
  }

  ngOnInit() {

  }

  onSearchSubmit() {
    if (this.administrativePoints.length > 0) {
      this.searchForm.get(FORM_PARAMS.locality).patchValue(this.administrativePoints[0].name);
    }
  }

  private selectArea(selectedArea: MunicipalitiesLayerGeoJson) {
    this.municipalityLayer.selectLayer(selectedArea, this.leafletMap);

    if (selectedArea) {
      this.searchForm.get(FORM_PARAMS.locality).enable();
    } else {
      this.point.emit(null);
      this.searchForm.get(FORM_PARAMS.locality).disable();
    }

    this.administrativePoints = [];
    this.searchForm.get(FORM_PARAMS.locality).reset('');
    this.administrativePoints = this.layersService.getAdministrativePoints(selectedArea);
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
    this.administrativePoints = this.administrativePoints.filter(ap => ap.name.includes(locality) && ap.name !== locality);
    // this.ref.detectChanges();
  }

  setSelectedPoint(administrativePoint: AdministrativeCenterPoint) {

  }
}
