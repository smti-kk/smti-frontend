import AccessPointLayer from './components/access-point-layer';
import { EventEmitter, Injectable } from '@angular/core';
import { LatLngBounds } from 'leaflet';
import { Subject } from 'rxjs';
import AccessPointsService from './service/access-points.service';
import AccessPointEspd from './model/access-point-espd';

const ESPD_MARKER_PATH = '../../../../assets/img/Ресурс 6.svg';

@Injectable()
export class AccessPointEspdLayer extends AccessPointLayer<AccessPointEspd> {

  constructor(private accessPointsService: AccessPointsService) {
    super();
  }

  getUpdatedPoints(interval: number, startStopUpdate?: EventEmitter<boolean>, bounds?: () => LatLngBounds): Subject<AccessPointEspd[]> {
    return this.accessPointsService.getUpdatedEspdPoints(interval, startStopUpdate, bounds);
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

  getIconUrl(point: AccessPointEspd) {
    return ESPD_MARKER_PATH;
  }
}
