import { EventEmitter, Injectable } from '@angular/core';
import AccessPointsService from './service/access-points.service';
import { LatLngBounds } from 'leaflet';
import { Subject } from 'rxjs';
import AccessPointLayer from './components/access-point-layer';
import AccessPointSmo from './model/access-point-smo';

@Injectable()
export class AccessPointSmoLayer extends AccessPointLayer<AccessPointSmo> {
  constructor(private accessPointsService: AccessPointsService) {
    super();
  }

  getUpdatedPoints(interval: number, startStopUpdate?: EventEmitter<any>, bounds?: () => LatLngBounds): Subject<AccessPointSmo[]> {
    return this.accessPointsService.getUpdatedSmoPoints(interval, startStopUpdate, bounds);
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
}
