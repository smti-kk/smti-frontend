import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { LeafletControlLayersConfig, LeafletDirective } from '@asymmetrik/ngx-leaflet';
import AccessPointsService from './service/access-points.service';
import { LatLngBounds, Layer, Map } from 'leaflet';
import { Subject } from 'rxjs';
import AccessPointLayer from './components/access-point-layer';
import AccessPointSmo from './model/access-point-smo';

const SMO_MARKER_PATH = '../../../../assets/map_marker-red1.png';
export const SMO_LAYER_NAME = 'СЗО Точки';

@Directive({
  selector: '[accessPointSmo]'
})
export class AccessPointSmoLayerDirective extends AccessPointLayer<AccessPointSmo> {
  @Input() leafletLayersControl: LeafletControlLayersConfig;
  @Output() layerReady: EventEmitter<Layer> = new EventEmitter<Layer>();

  constructor(private accessPointsService: AccessPointsService, private leafletDirective: LeafletDirective) {
    super();
  }

  getUpdatedPoints(interval: number, startStopUpdate?: EventEmitter<any>, bounds?: () => LatLngBounds): Subject<AccessPointSmo[]> {
    return this.accessPointsService.getUpdatedSmoPoints(interval, startStopUpdate, bounds);
  }

  getIconUrl(): string {
    return SMO_MARKER_PATH;
  }

  addToLayersControl(layersControl: LeafletControlLayersConfig, layer: Layer) {
    layersControl.overlays[SMO_LAYER_NAME] = layer;
    this.layerReady.emit(layer);
  }

  renderPopup(point: AccessPointSmo): string {
    return '<strong>Наименование организации: </strong>' + (point.orgName ? point.orgName : '?')
      + '<br />' + '<strong>Адрес точки подключения: </strong>' + (point.actualAddress ? point.actualAddress : '?')
      + '<br />' + '<strong>Поставщик интернета: </strong>' + (point.networkProvider ? point.networkProvider : '?')
      + '<br />' + '<strong>Технология подключения: </strong>' + (point.mediumType ? point.mediumType : '?')
      + '<br />' + '<strong>Скорость по тарифу: </strong>' + (point.definedSpeed ? point.definedSpeed : '?')
      + '<br />' + '<strong>Вид СЗО: </strong>' + (point.cmoType ? point.cmoType : '?')
      + '<br />' + '<strong>Тип учреждения: </strong>' + (point.institutionType ? point.institutionType : '?')
      + '<br />' + '<strong>Примечание: </strong>' + (point.description ? point.description : '---');
  }

  getLayersControl(): LeafletControlLayersConfig {
    return this.leafletLayersControl;
  }

  getMap(): Map {
    return this.leafletDirective.map;
  }
}
