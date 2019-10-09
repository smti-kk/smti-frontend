import { EventEmitter, Injectable } from '@angular/core';
import AccessPointLayer from './components/access-point-layer';
import { Observable } from 'rxjs';
import { LatLngBounds } from 'leaflet';
import AccessPointsService from './service/access-points.service';
import AdministrativeCenterPoint from './model/administrative-center-point';

const MARKER_ICON_DEFAULT = '../../../../assets/marker-icon-default.png';

@Injectable()
export class AdministrativeCentersLayer extends AccessPointLayer<AdministrativeCenterPoint> {
  constructor(private accessPointsService: AccessPointsService) {
    super();
  }

  getIconUrl(): string {
    return MARKER_ICON_DEFAULT;
  }

  getUpdatedPoints(interval: number,
                   startStopUpdate?: EventEmitter<any>,
                   bounds?: () => LatLngBounds): Observable<AdministrativeCenterPoint[]> {
    return this.accessPointsService.getUpdatedAdministrativeCenterPoints(interval, startStopUpdate);
  }

  renderPopup(point: AdministrativeCenterPoint) {
    const str: string[] = [];

    str.push('<h4 style="text-align: center; margin-bottom: 5px;">' + point.center + '</h4>');
    str.push('<h4 style="margin-bottom: 5px;">Район: ' + point.area + '</h4>');
    str.push('<h4 style="margin-bottom: 5px;">Население: ' + point.population + '</h4>');
    str.push('<h4 style="margin-bottom: 5px;">Мобильная связь: </h4>');
    point.mobileConnection.forEach(mc => {
      str.push('<img src="' + mc.icon + '" alt="' + mc.name + '" width="16px" height="16px" />');
      str.push('<b class="mobile-type">' + mc.type + '</b>');
    });

    str.push('<h4 style="margin-top: 5px;">Уровень мобильной связи: ' + point.mobileLevel + '</h4>');

    str.push('<h4 style="margin-top: 5px; margin-bottom: 5px;">Интернет: </h4>');
    point.internet.forEach(internet => {
      str.push('<img src="' + internet.icon + '" alt="' + internet.name + '" width="16px" height="16px"/>');
    });

    str.push('<h4 style="margin-top: 5px;">ТВ: </h4>');
    point.tv.forEach(tv => {
      str.push('<img src="' + tv.icon + '" alt="' + tv.title + '" width="16px" height="16px"/>');
      str.push('<span style="font-size: 10px;">' + tv.type + '</span>');
    });

    str.push('<h4 style="margin-top: 5px;">Радио: </h4>');
    point.radio.forEach(radio => {
      str.push('<img src="' + radio.icon + '" alt="' + radio.name + '" width="16px" height="16px"/>');
      str.push('<span>' + radio.type + '</span>');
    });

    return str.join(' ');
  }
}
