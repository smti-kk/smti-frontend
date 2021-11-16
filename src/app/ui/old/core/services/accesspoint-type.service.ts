import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccessPointState, AccessPointType} from '@core/models/accesspoint-type';
import {ACCESS_POINT_MONITORING, ACCESS_POINT_TYPE} from '@core/constants/api';
import {Observable} from 'rxjs';

@Injectable()
export class AccessPointService {

  constructor(private httpClient: HttpClient) {
  }

  getAccessPointType(): Observable<AccessPointType[]> {
    return this.httpClient.get<AccessPointType[]>(ACCESS_POINT_TYPE);
  }

  getAccessPointsState(): Observable<AccessPointState> {
    return this.httpClient.get<AccessPointState>(ACCESS_POINT_MONITORING);
  }
}
