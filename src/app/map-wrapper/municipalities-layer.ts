import { GeoJSON } from 'leaflet';
import { FeatureCollection } from 'geojson';
import LocationArea from './model/location-area';
import { HIGHLIGHT_FEATURE, MAP_TERRITORIES_STYLE } from './constants/inline.style';
import { EventEmitter } from '@angular/core';

export class MunicipalitiesLayer extends GeoJSON<LocationArea> {
  public onMunicipalityClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(private municipalities: LocationArea[]) {
    super();

    const communicationScoreFeature: FeatureCollection = {
      type: 'FeatureCollection',
      features: municipalities
    };

    this.addData(communicationScoreFeature);
    this.setStyle(MAP_TERRITORIES_STYLE);
    this.addStyles();
  }

  private addStyles() {
    this.eachLayer((layer: any) => {
      MunicipalitiesLayer.addEventListeners(layer);
      layer.on('click', () => this.onMunicipalityClick.emit(layer));
    });
  }

  public static addEventListeners(layer) {
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
}
