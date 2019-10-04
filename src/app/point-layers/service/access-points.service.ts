import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import AccessPointEspd from '../model/access-point-espd';
import { AccessPointType } from '../model/access-point-type';
import AccessPointSmo from '../model/access-point-smo';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LatLngBounds } from 'leaflet';
import AdministrativeCenterPoint, { MobileType, Operator } from '../model/administrative-center-point';
import { MOBILE_TYPE_URL, OPERATOR_URL } from './api.constants';
import MunicipalityService from '../../shared/services/municipality.serivice';

@Injectable()
export default class AccessPointsService {
  constructor(private http: HttpClient,
              private municipalityService: MunicipalityService) {
  }

  async getMobileType(): Promise<MobileType[]> {
    return this.http.get<MobileType[]>(MOBILE_TYPE_URL).toPromise();
  }

  async getOperators(): Promise<Operator[]> {
    return this.http.get<Operator[]>(OPERATOR_URL).toPromise();
  }

  getUpdatedEspdPoints(interval: number, startStopUpdate?: EventEmitter<boolean>, bounds?: () => LatLngBounds): Subject<AccessPointEspd[]> {
    return this.getUpdatedPoints<AccessPointEspd>(
      interval,
      AccessPointEspd.createFromApiModel,
      AccessPointType.ESPD,
      startStopUpdate,
      bounds
    );
  }

  getUpdatedSmoPoints(interval: number, startStopUpdate?: EventEmitter<boolean>, bounds?: () => LatLngBounds): Subject<AccessPointSmo[]> {
    return this.getUpdatedPoints<AccessPointSmo>(interval, AccessPointSmo.createFromApiModel, AccessPointType.SMO, startStopUpdate, bounds);
  }

  async getAdministrativePointsSubject(startStop: EventEmitter<boolean>): Promise<Subject<AdministrativeCenterPoint[]>> {
    const mobileType = await this.getMobileType();
    const operators = await this.getOperators();
    const locationArea = await this.municipalityService.getMunicipalitiesArea().toPromise();

    const administrativeCentersObserver = new Subject<AdministrativeCenterPoint[]>();

    this.getAdministrativePoints().then(ap => administrativeCentersObserver.next(ap));

    startStop.subscribe(start => {
      if (start) {
        this.getAdministrativePoints().then(ap => administrativeCentersObserver.next(ap));
      }
    });

    this.municipalityService.getLocationCapabilities(false).subscribe(lc => {
      administrativeCentersObserver.next(lc
        .map(locationCapability => AdministrativeCenterPoint.create(locationArea, locationCapability, mobileType, operators))
        .filter(locationCapability => locationCapability !== undefined));
    });

    return administrativeCentersObserver;
  }

  private async getAdministrativePoints() {
    const mobileType = await this.getMobileType();
    const operators = await this.getOperators();
    const locationArea = await this.municipalityService.getMunicipalitiesArea().toPromise();
    const locationCapabilities = await this.municipalityService.getLocationCapabilities(false).toPromise();

    return locationCapabilities
      .map(lc => AdministrativeCenterPoint.create(locationArea, lc, mobileType, operators))
      .filter(lc => lc !== undefined);
  }

  private getUpdatedPoints<T>(interval: number,
                              mapper: (dataFromApi) => T,
                              accessPointType: AccessPointType,
                              startUpdate?: EventEmitter<boolean>,
                              bounds?: () => LatLngBounds): Subject<T[]> {
    const points: Subject<T[]> = new Subject<T[]>();
    let timer;

    if (startUpdate) {
      startUpdate.subscribe((start) => {
        if (start) {
          timer = this.startUpdateAccessPoints(points, interval, mapper, accessPointType, bounds());
        } else {
          clearInterval(timer);
        }
      });
    } else {
      this.startUpdateAccessPoints(points, interval, mapper, accessPointType, bounds());
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
