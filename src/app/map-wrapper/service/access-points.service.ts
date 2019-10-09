import { EventEmitter, Injectable } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import AccessPointEspd from '../model/access-point-espd';
import AccessPointSmo from '../model/access-point-smo';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LatLngBounds } from 'leaflet';
import AdministrativeCenterPoint, { MobileType, Operator } from '../model/administrative-center-point';
import { ACCESS_POINT_ESPD_URL, ACCESS_POINT_SMO_URL, MOBILE_TYPE_URL, OPERATOR_URL } from '../constants/api.constants';
import MunicipalityService from './municipality.serivice';
import LocationArea from '../model/location-area';
import LocationSummaryCapability from '../model/location-summary-capability';

@Injectable()
export default class AccessPointsService {
  constructor(private http: HttpClient,
              private municipalityService: MunicipalityService) {
  }

  getMobileType(): Observable<MobileType[]> {
    return this.http.get<MobileType[]>(MOBILE_TYPE_URL);
  }

  getOperators(): Observable<Operator[]> {
    return this.http.get<Operator[]>(OPERATOR_URL);
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

    return setInterval(() => {
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

  private getAdministrativePoints(): Observable<AdministrativeCenterPoint[]> {
    return forkJoin<LocationArea[], Operator[], MobileType[], LocationSummaryCapability[]>(
      this.municipalityService.getMunicipalitiesArea(),
      this.getMobileType(),
      this.getOperators(),
      this.municipalityService.getLocationCapabilities(false)
    )
      .pipe(
        map(
          results => results[3].map(lc => AdministrativeCenterPoint.create(results[0], lc, results[1], results[2]))
            .filter(lc => lc !== undefined)
        ));
  }
}
