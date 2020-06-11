import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccessPointType} from '@core/models/accesspoint-type';
import {ACCESS_POINT_TYPE} from '@core/constants/api';

@Injectable()
export class AccessPointTypeService {

  constructor(private httpClient: HttpClient) {
  }

  getAccessPointType(): Observable<AccessPointType[]> {
    return this.httpClient.get<AccessPointType[]>(ACCESS_POINT_TYPE);
  }
}
