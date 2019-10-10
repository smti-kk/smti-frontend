import { GeoJSON, Map } from 'leaflet';
import { FeatureCollection } from 'geojson';
import LocationArea from './model/location-area';
import { HIGHLIGHT_FEATURE, MAP_TERRITORIES_STYLE } from './constants/inline.style';
import { Injectable } from '@angular/core';
import MunicipalityService from './service/municipality.serivice';

@Injectable()
export default class MunicipalitiesLayer extends GeoJSON<LocationArea> {
  constructor(private municipalityService: MunicipalityService) {
    super();

    this.municipalityService.getMunicipalitiesArea().subscribe(ma => {
      const communicationScoreFeature: FeatureCollection = {
        type: 'FeatureCollection',
        features: ma
      };

      this.addData(communicationScoreFeature);
      this.setStyle(MAP_TERRITORIES_STYLE);
    });
  }

  addStylesToMap(map: Map) {
    this.eachLayer((layer: any) => {
      layer.on({
        mouseover: event => {
          event.target.setStyle(HIGHLIGHT_FEATURE);
          layer.bringToFront();
        },
        mouseout: event => {
          event.target.setStyle(MAP_TERRITORIES_STYLE);
        },
        click: event => {
          map.fitBounds(event.target.getBounds());
        }
      });
    });
  }
}
