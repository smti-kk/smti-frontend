import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  searchForm: FormGroup;
  locations: MunicipalitiesLayerGeoJson[];
  administrativePoints: AdministrativeCenterPoint[] = [];

  private municipalityLayer: MunicipalitiesLayer;

  @Input() private leafletMap: Map;
  @Output() point: EventEmitter<AdministrativeCenterPoint> = new EventEmitter<AdministrativeCenterPoint>();

  constructor(private readonly layersService: LayersService,
              private readonly fb: FormBuilder,
              private readonly ref: ChangeDetectorRef) {
    layersService.municipalitiesLayer.subscribe(m => {
      this.municipalityLayer = m;
      this.locations = m.getLayers();
    });

    this.buildForm();
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

  private buildForm() {
    this.searchForm = this.fb.group({
      [FORM_PARAMS.area]: [null],
      [FORM_PARAMS.locality]: ['']
    });

    this.searchForm.get(FORM_PARAMS.area).valueChanges.subscribe(selectedArea => this.selectArea(selectedArea));
    this.searchForm.get(FORM_PARAMS.locality).valueChanges.subscribe(locality => this.filterLocalities(locality));

    this.searchForm.get(FORM_PARAMS.locality).disable();
  }

  private filterLocalities(locality: string) {
    if (this.administrativePoints) {
      this.administrativePoints = this.administrativePoints.filter(ap => ap.name.includes(locality) && ap.name !== locality);
      this.ref.detectChanges();
    }
  }

  setSelectedPoint(administrativePoint: AdministrativeCenterPoint) {

  }
}
