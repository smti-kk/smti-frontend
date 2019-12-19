import { MonitoringLayer } from '../components/monitoring-layer';
import { DivIcon, LatLngBounds, MarkerCluster, Point } from 'leaflet';
import { Observable } from 'rxjs';
import { AccessPointEspd } from '../model/access-point-espd';
import { EspdService } from '../service/espd.service';
import { Injectable } from '@angular/core';
import { MonitoringMarker } from '@map-wrapper/components/monitoring-marker';

@Injectable()
export class AccessPointEspdLayer extends MonitoringLayer<AccessPointEspd> {

  constructor(private espdService: EspdService) {
    super({iconCreateFunction: AccessPointEspdLayer.iconCreateFunction});
  }

  renderPopup(point: AccessPointEspd): string {
    return '<strong>Наименование организации: </strong>' + (point.orgName ? point.orgName : '---')
      + '<br />' + '<strong>Адрес точки подключения: </strong>' + (point.actualAddress ? point.actualAddress : '---')
      + '<br />' + '<strong>Заказчик: </strong>' + (point.customer ? point.customer : '---')
      + '<br />' + '<strong>Подрядчик: </strong>' + (point.contractor ? point.contractor : '---')
      + '<br />' + '<strong>Технология подключения: </strong>' + (point.mediumType ? point.mediumType : '---')
      + '<br />' + '<strong>Точка подключения: </strong>' + (point.connection ? point.connection : '---')
      + '<br />' + '<strong>Скорость по контракту: </strong>' + (point.definedSpeed ? point.definedSpeed : '---')
      + '<br />' + '<strong>Состояние: </strong>' + (point.avstate ? point.avstate : '---')
      + '<br />' + '<strong>Входящий траффик: </strong>' + (point.traffic ? point.traffic : '---');
  }

  getPoints(bounds?: LatLngBounds): Observable<AccessPointEspd[]> {
    if (bounds) {
      return this.espdService.listFilteredByBounds(bounds);
    } else {
      return this.espdService.list();
    }
  }

  static iconCreateFunction(cluster: MarkerCluster) {
    const childMarkers = cluster.getAllChildMarkers() as MonitoringMarker<AccessPointEspd>[];
    const childCount = cluster.getChildCount();

    let c = ' marker-cluster-';
    if (childMarkers.find(cm => cm.feature.properties.avstate && cm.feature.properties.avstate.includes('Не доступно'))) {
      c += 'large';
    } else if (childMarkers.find(cm => cm.feature.properties.avstate)) {
      c += 'small';
    } else {
      c += 'undefined';
    }

    return new DivIcon({
      html: '<div><span>' + childCount + '</span></div>',
      className: 'marker-cluster' + c,
      iconSize: new Point(40, 40)
    });
  }
}
