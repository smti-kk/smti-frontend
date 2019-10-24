import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { AccessPointEspd } from '../model/access-point-espd';
import { AccessPointSmo } from '../model/access-point-smo';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LatLngBounds } from 'leaflet';
import { AdministrativeCenterPoint } from '../model/administrative-center-point';
import { ACCESS_POINT_ESPD_URL, ACCESS_POINT_SMO_URL, LOCATION_URL } from '../constants/api.constants';
import { MapWrapperModule } from '@map-wrapper/map-wrapper.module';

@Injectable({
  providedIn: MapWrapperModule
})
export class AccessPointsService {
  constructor(private http: HttpClient) {
  }

  getUpdatedEspdPoints(interval: number, startStopUpdate?: EventEmitter<boolean>, bounds?: () => LatLngBounds): Subject<AccessPointEspd[]> {
    return this.getUpdatedPoints<AccessPointEspd>(interval, () => this.getAccessPointsEspd(bounds()), startStopUpdate);
  }

  getUpdatedSmoPoints(interval: number, startStopUpdate?: EventEmitter<boolean>, bounds?: () => LatLngBounds): Subject<AccessPointSmo[]> {
    return this.getUpdatedPoints<AccessPointSmo>(interval, () => this.getAccessPointsSmo(bounds()), startStopUpdate);
  }

  getUpdatedAdministrativeCenterPoints(interval: number, startStopUpdate?: EventEmitter<boolean>): Observable<AdministrativeCenterPoint[]> {
    return this.getUpdatedPoints<AdministrativeCenterPoint>(interval, () => this.getAdministrativePoints(), startStopUpdate);
  }

  private getUpdatedPoints<T>(interval: number,
                              getData: (bounds?: LatLngBounds) => Observable<T[]>,
                              startUpdate?: EventEmitter<boolean>): Subject<T[]> {
    const points: Subject<T[]> = new Subject<T[]>();
    let timer;

    if (startUpdate) {
      startUpdate.subscribe((start) => {
        if (start) {
          timer = this.startUpdatePoints(points, interval, getData);
        } else {
          clearInterval(timer);
        }
      });
    } else {
      this.startUpdatePoints(points, interval, getData);
    }

    return points;
  }

  private startUpdatePoints<T>(accessPoints: Subject<T[]>,
                               interval: number,
                               getData: (bounds?) => Observable<T[]>): number {
    getData().subscribe(data => {
      accessPoints.next(data);
    });

    return window.setInterval(() => {
      getData().subscribe(data => {
        accessPoints.next(data);
      });
    }, interval);
  }

  private getAccessPointsSmo(bounds?: LatLngBounds): Observable<AccessPointSmo[]> {
    if (bounds) {
      return this.http.get<any[]>(`${ACCESS_POINT_SMO_URL}?bbox=
                                                    ${bounds.getSouthWest().lng},
                                                    ${bounds.getSouthWest().lat},
                                                    ${bounds.getNorthEast().lng},
                                                    ${bounds.getNorthEast().lat}`)
        .pipe(map(apss => apss.map(aps => AccessPointSmo.createFromApiModel(aps))));
    } else {
      return this.http.get<any[]>(ACCESS_POINT_SMO_URL)
        .pipe(map(apss => apss.map(aps => AccessPointSmo.createFromApiModel(aps))));
    }
  }

  private getAccessPointsEspd(bounds?: LatLngBounds): Observable<AccessPointEspd[]> {
    if (bounds) {
      return this.http.get<any[]>(`${ACCESS_POINT_ESPD_URL}?bbox=
                                                    ${bounds.getSouthWest().lng},
                                                    ${bounds.getSouthWest().lat},
                                                    ${bounds.getNorthEast().lng},
                                                    ${bounds.getNorthEast().lat}`)
        .pipe(map(apss => apss.map(aps => AccessPointEspd.createFromApiModel(aps))));
    } else {
      return this.http.get<any[]>(ACCESS_POINT_ESPD_URL)
        .pipe(map(apss => apss.map(aps => AccessPointEspd.createFromApiModel(aps))));
    }
  }

  // todo: Будет удалено
  // tslint:disable-next-line:member-ordering
  private administrativePoints: AdministrativeCenterPoint[];

  private getAdministrativePoints(): Observable<AdministrativeCenterPoint[]> {
    if (!this.administrativePoints) {
      return this.http.get<any[]>(LOCATION_URL)
        .pipe(map(locations => {
          this.administrativePoints = locations.map(location => AdministrativeCenterPoint.create(location));
          return this.administrativePoints;
        }));
    } else {
      return of(this.administrativePoints);
    }
  }
}
