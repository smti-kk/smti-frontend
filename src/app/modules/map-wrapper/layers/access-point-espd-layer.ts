import { AccessPointLayer } from '../components/access-point-layer';
import { LatLngBounds } from 'leaflet';
import { Observable } from 'rxjs';
import { AccessPointEspd } from '../model/access-point-espd';
import { EspdService } from '../service/espd.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AccessPointEspdLayer extends AccessPointLayer<AccessPointEspd> {

  constructor(private espdService: EspdService) {
    super();
  }

  renderPopup(point: AccessPointEspd): string {
    return '<strong>Наименование организации: </strong>' + (point.name ? point.name : '---')
      + '<br />' + '<strong>Адрес точки подключения: </strong>' + (point.actualAddress ? point.actualAddress : '---')
      + '<br />' + '<strong>Заказчик: </strong>' + (point.customer ? point.customer : '---')
      + '<br />' + '<strong>Подрядчик: </strong>' + (point.contractor ? point.contractor : '---')
      + '<br />' + '<strong>Технология подключения: </strong>' + (point.mediumType ? point.mediumType : '---')
      + '<br />' + '<strong>Точка подключения: </strong>' + (point.connection ? point.connection : '---')
      + '<br />' + '<strong>Скорость по контракту: </strong>' + (point.definedSpeed ? point.definedSpeed : '---')
      + '<br />' + '<strong>Состояние: </strong>' + (point.avstateStr ? point.avstateStr : '---')
      + '<br />' + '<strong>Входящий траффик: </strong>' + (point.traffic ? point.traffic : '---');
  }

  getPoints(bounds?: LatLngBounds): Observable<AccessPointEspd[]> {
    if (bounds) {
      return this.espdService.listFilteredByBounds(bounds);
    } else {
      return this.espdService.list();
    }
  }
}
