import { AccessPointLayer } from './components/access-point-layer';
import { LatLngBounds } from 'leaflet';
import { Observable } from 'rxjs';
import { AccessPointsService } from './service/access-points.service';
import { AccessPointEspd } from './model/access-point-espd';


export class AccessPointEspdLayer extends AccessPointLayer<AccessPointEspd> {

  constructor(private accessPointsService: AccessPointsService) {
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
    return this.accessPointsService.getAccessPointsEspd(bounds);
  }
}
