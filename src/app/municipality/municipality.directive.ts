import { Directive, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { LeafletControlLayersConfig, LeafletDirective } from '@asymmetrik/ngx-leaflet';
import MunicipalityService from '../shared/services/municipality.serivice';
import MunicipalitiesLayer from './components/municipalities-layer';
import { Layer } from 'leaflet';

export const MUNICIPALITIES_LAYER_TITLE = 'Средняя оценка связи по муниципальным образованиям';

@Directive({
  selector: '[municipalities]'
})
@Injectable()
export class MunicipalityDirective implements OnInit {
  @Input() leafletLayersControl: LeafletControlLayersConfig;
  @Output() municipalityLayerReady: EventEmitter<Layer> = new EventEmitter<Layer>();

  constructor(private leafletDirective: LeafletDirective,
              private municipalityService: MunicipalityService) {
    if (!leafletDirective) {
      throw new Error('Required leaflet directive from ngx-leaflet');
    }
  }

  ngOnInit(): void {
    this.municipalityService.getMunicipalitiesArea().subscribe(la => {
      const municipalitiesLayer = new MunicipalitiesLayer(la);
      municipalitiesLayer.addTo(this.leafletDirective.map);
      this.municipalityService.getLocationCapabilities(false).subscribe(lc => {
        municipalitiesLayer.addInfoControlToMap(lc, this.leafletDirective.map);
        this.leafletLayersControl.overlays[MUNICIPALITIES_LAYER_TITLE] = municipalitiesLayer;
        this.municipalityLayerReady.emit(municipalitiesLayer);
      });
    });
  }
}
