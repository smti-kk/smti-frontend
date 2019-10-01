import AccessPointLayer from './components/access-point-layer';
import { Directive, EventEmitter, Input } from '@angular/core';
import { LatLngBounds, Layer, Map } from 'leaflet';
import { Subject } from 'rxjs';
import AccessPointsService from './service/access-points.service';
import AccessPointEspd from './model/access-point-espd';
import { LeafletControlLayersConfig, LeafletDirective } from '@asymmetrik/ngx-leaflet';

const ESPD_MARKER_PATH = '../../../../assets/map-marker-2.png';
export const ESPD_LAYER_NAME = 'ЕСПД Точки';

@Directive({
  selector: '[accessPointsEspd]'
})
export class AccessPointEspdLayerDirective extends AccessPointLayer<AccessPointEspd> {

  @Input() leafletLayersControl: LeafletControlLayersConfig;

  constructor(private accessPointsService: AccessPointsService,
              private leafletDirective: LeafletDirective) {
    super();
  }

  getUpdatedPoints(interval: number, startStopUpdate?: EventEmitter<any>, bounds?: () => LatLngBounds): Subject<AccessPointEspd[]> {
    return this.accessPointsService.getUpdatedEspdPoints(interval, startStopUpdate, bounds);
  }

  addToLayersControl(layersControl: LeafletControlLayersConfig, layer: Layer) {
    layersControl.overlays[ESPD_LAYER_NAME] = layer;
  }

  renderPopup(point: AccessPointEspd): string {
    return '<strong>Наименование организации: </strong>' + (point.orgName ? point.orgName : '?')
      + '<br />' + '<strong>Адрес точки подключения: </strong>' + (point.actualAddress ? point.actualAddress : '?')
      + '<br />' + '<strong>Заказчик: </strong>' + (point.customer ? point.customer : '?')
      + '<br />' + '<strong>Подрядчик: </strong>' + (point.contractor ? point.contractor : '?')
      + '<br />' + '<strong>Технология подключения: </strong>' + (point.mediumType ? point.mediumType : '?')
      + '<br />' + '<strong>Точка подключения: </strong>' + (point.connection ? point.connection : '?')
      + '<br />' + '<strong>Скорость по тарифу: </strong>' + (point.definedSpeed ? point.definedSpeed : '?');
  }

  getIconUrl() {
    return ESPD_MARKER_PATH;
  }

  getLayersControl(): LeafletControlLayersConfig {
    return this.leafletLayersControl;
  }

  getMap(): Map {
    return this.leafletDirective.map;
  }

}
