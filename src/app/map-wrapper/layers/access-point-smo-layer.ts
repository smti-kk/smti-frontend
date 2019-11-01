import { LatLngBounds } from 'leaflet';
import { Observable } from 'rxjs';
import { AccessPointLayer } from '../components/access-point-layer';
import { AccessPointSmo } from '../model/access-point-smo';
import { SmoService } from '@map-wrapper/service/smo.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AccessPointSmoLayer extends AccessPointLayer<AccessPointSmo> {
  constructor(private smoService: SmoService) {
    super();
  }

  renderPopup(point: AccessPointSmo): string {
    return '<strong>Наименование организации: </strong>' + (point.orgName ? point.orgName : '?')
      + '<br />' + '<strong>Адрес точки подключения: </strong>' + (point.actualAddress ? point.actualAddress : '?')
      + '<br />' + '<strong>Поставщик интернета: </strong>' + (point.networkProvider ? point.networkProvider : '?')
      + '<br />' + '<strong>Технология подключения: </strong>' + (point.mediumType ? point.mediumType : '?')
      + '<br />' + '<strong>Скорость по контракту: </strong>' + (point.definedSpeed ? point.definedSpeed : '?')
      + '<br />' + '<strong>Вид СЗО: </strong>' + (point.cmoType ? point.cmoType : '?')
      + '<br />' + '<strong>Тип учреждения: </strong>' + (point.institutionType ? point.institutionType : '?')
      + '<br />' + '<strong>Примечание: </strong>' + (point.description ? point.description : '---');
  }

  getPoints(bounds?: LatLngBounds): Observable<AccessPointSmo[]> {
    if (bounds) {
      return this.smoService.listFilteredByBounds(bounds);
    } else {
      return this.smoService.list();
    }
  }
}