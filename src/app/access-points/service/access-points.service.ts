import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import AccessPointEspd from '../model/access-point-espd';
import { AccessPointType } from '../model/access-point-type';
import AccessPointSmo from '../model/access-point-smo';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LatLngBounds } from 'leaflet';

@Injectable()
export default class AccessPointsService {
  constructor(private http: HttpClient) {
  }

  getUpdatedEspdPoints(interval: number, forceUpdate?: EventEmitter<any>, bounds?: () => LatLngBounds): Subject<AccessPointEspd[]> {
    return this.getUpdatedPoints<AccessPointEspd>(interval, AccessPointEspd.createFromApiModel, AccessPointType.ESPD, forceUpdate, bounds);
  }

  getUpdatedSmoPoints(interval: number, forceUpdate?: EventEmitter<any>, bounds?: () => LatLngBounds): Subject<AccessPointSmo[]> {
    return this.getUpdatedPoints<AccessPointSmo>(interval, AccessPointSmo.createFromApiModel, AccessPointType.SMO, forceUpdate, bounds);
  }

  private getUpdatedPoints<T>(interval: number,
                              mapper: (dataFromApi) => T,
                              accessPointType: AccessPointType,
                              startStop?: EventEmitter<any>,
                              bounds?: () => LatLngBounds): Subject<T[]> {
    const points: Subject<T[]> = new Subject<T[]>();
    let timer;

    if (startStop) {
      let start = false;
      startStop.subscribe(() => {
        if (start) {
          start = false;
          clearInterval(timer);
        } else {
          start = true;
          timer = this.startUpdateAccessPoints(points, interval, mapper, accessPointType, bounds());
        }
      });
    }

    return points;
  }

  private startUpdateAccessPoints<T>(accessPoints: Subject<T[]>,
                                     interval: number,
                                     mapper: (dataFromApi) => T,
                                     accessPointType: AccessPointType,
                                     bounds?: LatLngBounds): number {
    this.getAccessPoints(accessPointType, mapper, bounds)
      .subscribe(points => accessPoints.next(points));

    return setInterval(() => {
      this.getAccessPoints<T>(accessPointType, mapper, bounds)
        .subscribe(points => accessPoints.next(points));
    }, interval);
  }

  private getAccessPoints<T>(type: AccessPointType, mapper: (dataFromApi) => T, bounds?: LatLngBounds): Observable<T[]> {
    if (bounds) {
      return this.http.get<any[]>(`${type.apiUrl}?bbox=
                                                                    ${bounds.getSouthWest().lng},
                                                                    ${bounds.getSouthWest().lat},
                                                                    ${bounds.getNorthEast().lng},
                                                                    ${bounds.getNorthEast().lat}`)
        .pipe(map(points => points.map(point => mapper(point))));
    } else {
      return this.http.get<any[]>(type.apiUrl)
        .pipe(map(points => points.map(point => mapper(point))));
    }
  }
}
