import { Directive, Input, OnInit } from '@angular/core';
import { LeafletControlLayersConfig, LeafletDirective } from '@asymmetrik/ngx-leaflet';
import { FeatureCollection } from 'geojson';
import { HIGHLIGHT_FEATURE, MAP_TERRITORIES_STYLE } from './constants/inline.style';
import { geoJSON, GeoJSON, Map } from 'leaflet';
import LocationArea from './model/location-area';
import MunicipalityService from './service/municipality.serivice';
import LeafletInfoControl from './components/leaflet-info-control';

const MUNICIPALITIES_LAYER_TITLE = 'Средняя оценка связи по муниципальным образованиям';

@Directive({
  selector: '[locationCapabilities]'
})
export default class MunicipalityDirective implements OnInit {
  @Input() leafletLayersControl: LeafletControlLayersConfig;
  private readonly communicationScoreLayer: GeoJSON<LocationArea> = geoJSON();
  private leaflet: Map;

  constructor(private leafletDirective: LeafletDirective,
              private locationService: MunicipalityService) {
    if (!leafletDirective) {
      throw new Error('Required leaflet directive from ngx-leaflet');
    }
  }

  ngOnInit(): void {
    this.leafletLayersControl.overlays[MUNICIPALITIES_LAYER_TITLE] = this.communicationScoreLayer;
    this.leaflet = this.leafletDirective.map;
    this.configCommunicationScoreLayer();
    this.communicationScoreLayer.addTo(this.leaflet);
  }

  private configCommunicationScoreLayer() {
    this.locationService.getLocationArea().subscribe(locationArea => {
      const communicationScoreFeature: FeatureCollection = {
        type: 'FeatureCollection',
        features: locationArea
      };

      this.communicationScoreLayer.addData(communicationScoreFeature);
      this.communicationScoreLayer.setStyle(MAP_TERRITORIES_STYLE);

      this.locationService.getLocationCapabilities(false).subscribe(lc => {
        const info = new LeafletInfoControl(lc).addTo(this.leaflet);

        this.communicationScoreLayer.eachLayer((layer: any) => {
          layer.on({
            mouseover: event => {
              event.target.setStyle(HIGHLIGHT_FEATURE);
              info.show(layer.feature);
            },
            mouseout: event => {
              event.target.setStyle(MAP_TERRITORIES_STYLE);
              info.hide();
            },
            click: event => this.leaflet.fitBounds(event.target.getBounds())
          });
        });
      });
    });
  }
}
