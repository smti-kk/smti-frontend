import { GeoJSON } from 'leaflet';
import { Feature, FeatureCollection, MultiPoint } from 'geojson';
import { LocationAreaProperties } from '../model/location-area';
import { HIGHLIGHT_FEATURE, MAP_TERRITORIES_STYLE } from '../constants/inline.style';
import { EventEmitter, Injectable } from '@angular/core';
import { MunicipalityService } from '../service/municipality.service';

export interface MunicipalitiesLayerGeoJson extends GeoJSON<LocationAreaProperties> {
  feature: Feature<MultiPoint, LocationAreaProperties>;
}

@Injectable()
export class MunicipalitiesLayer extends GeoJSON {
  public onMunicipalityClick: EventEmitter<MunicipalitiesLayerGeoJson> = new EventEmitter<MunicipalitiesLayerGeoJson>();
  public selectedLocation: MunicipalitiesLayerGeoJson;

  constructor(municipalityService: MunicipalityService) {
    super();

    municipalityService.list().subscribe(municipalities => {
      const communicationScoreFeature: FeatureCollection<MultiPoint, LocationAreaProperties> = {
        type: 'FeatureCollection',
        features: municipalities
      };

      this.addData(communicationScoreFeature);
      this.setStyle(MAP_TERRITORIES_STYLE);
      this.addStyles();
    });
  }

  public getLayers(): MunicipalitiesLayerGeoJson[] {
    return super.getLayers().sort(MunicipalitiesLayer.sortByAreaName) as MunicipalitiesLayerGeoJson[];
  }

  public selectLayer(layer: MunicipalitiesLayerGeoJson) {
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
    return this.getLayers().find(layer => layer.feature.properties.name === areaName);
  }

  private addStyles() {
    this.eachLayer((layer: MunicipalitiesLayerGeoJson) => {
      MunicipalitiesLayer.addEventListeners(layer);
      layer.on('click', () => {
        this.selectLayer(layer);
        this.onMunicipalityClick.emit(layer);
      });
    });
  }

  public static addEventListeners(layer: GeoJSON) {
    layer.on('mouseover', MunicipalitiesLayer.mouseOver);
    layer.on('mouseout', MunicipalitiesLayer.mouseOut);
  }

  public static removeEventListeners(layer) {
    layer.removeEventListener('mouseover', MunicipalitiesLayer.mouseOver);
    layer.removeEventListener('mouseout', MunicipalitiesLayer.mouseOut);
  }

  private static mouseOver(event) {
    event.target.setStyle(HIGHLIGHT_FEATURE);
    event.target.bringToFront();
  }

  private static mouseOut(event) {
    event.target.setStyle(MAP_TERRITORIES_STYLE);
  }

  private static sortByAreaName(layer1: MunicipalitiesLayerGeoJson, layer2: MunicipalitiesLayerGeoJson) {
    if (layer1.feature.properties.name < layer2.feature.properties.name) {
      return -1;
    }
    if (layer1.feature.properties.name > layer2.feature.properties.name) {
      return 1;
    }
    return 0;
  }
}
