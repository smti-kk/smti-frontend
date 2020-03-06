import {GeoJSON} from 'leaflet';
// eslint-disable-next-line import/no-unresolved
import {FeatureCollection, MultiPoint} from 'geojson';
import {EventEmitter, Injectable} from '@angular/core';

import {LocationAreaProperties} from '@map-wrapper/model/location-area-properties';
import {LocationArea} from '@map-wrapper/model/location-area';

import {MunicipalityService} from '../service/municipality.service';
import {HIGHLIGHT_FEATURE, MAP_TERRITORIES_STYLE} from '../constants/inline.style';

export interface MunicipalitiesLayerGeoJson extends GeoJSON<LocationAreaProperties> {
  feature: LocationArea;
}

@Injectable()
export class MunicipalitiesLayer extends GeoJSON {
  public onMunicipalityClick: EventEmitter<MunicipalitiesLayerGeoJson> = new EventEmitter<
  MunicipalitiesLayerGeoJson
  >();

  public selectedLocation: MunicipalitiesLayerGeoJson;

  constructor(municipalityService: MunicipalityService) {
    super();

    municipalityService.list().subscribe(municipalities => {
      const communicationScoreFeature: FeatureCollection<MultiPoint, LocationAreaProperties> = {
        type: 'FeatureCollection',
        features: municipalities,
      };

      this.addData(communicationScoreFeature);
      this.setStyle(MAP_TERRITORIES_STYLE);
      this.addStyles();
    });
  }

  public getLayers(): MunicipalitiesLayerGeoJson[] {
    return super
      .getLayers()
      .sort(MunicipalitiesLayer.sortByAreaName) as MunicipalitiesLayerGeoJson[];
  }

  public selectLayer(layer: MunicipalitiesLayerGeoJson): void {
    if (this.selectedLocation) {
      this.selectedLocation.setStyle(MAP_TERRITORIES_STYLE);
      MunicipalitiesLayer.addEventListeners(this.selectedLocation);
    }

    if (layer) {
      layer.setStyle(HIGHLIGHT_FEATURE);
      layer.bringToFront();
      MunicipalitiesLayer.removeEventListeners(layer);

      if (this.selectedLocation !== layer) {
        this._map.fitBounds(layer.getBounds());
      }
    }
    this.selectedLocation = layer;
  }

  public getLayerByAreaName(areaName: string): MunicipalitiesLayerGeoJson {
    return this.getLayers().find(layer => layer.feature.name === areaName);
  }

  private addStyles(): void {
    this.eachLayer((layer: MunicipalitiesLayerGeoJson) => {
      MunicipalitiesLayer.addEventListeners(layer);
      layer.on('click', () => {
        this.selectLayer(layer);
        this.onMunicipalityClick.emit(layer);
      });
    });
  }

  public static addEventListeners(layer: GeoJSON): void {
    layer.on('mouseover', MunicipalitiesLayer.mouseOver);
    layer.on('mouseout', MunicipalitiesLayer.mouseOut);
  }

  public static removeEventListeners(layer): void {
    layer.removeEventListener('mouseover', MunicipalitiesLayer.mouseOver);
    layer.removeEventListener('mouseout', MunicipalitiesLayer.mouseOut);
  }

  private static mouseOver(event): void {
    event.target.setStyle(HIGHLIGHT_FEATURE);
    event.target.bringToFront();
  }

  private static mouseOut(event): void {
    event.target.setStyle(MAP_TERRITORIES_STYLE);
  }

  private static sortByAreaName(
    layer1: MunicipalitiesLayerGeoJson,
    layer2: MunicipalitiesLayerGeoJson
  ): number {
    if (layer1.feature.name < layer2.feature.name) {
      return -1;
    }
    if (layer1.feature.name > layer2.feature.name) {
      return 1;
    }
    return 0;
  }
}
