import { Injectable } from '@angular/core';
import { RestApiService } from '@core/services/common/rest-api-service';
import { LocationFeatures } from '@core/models';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StoreService } from '@core/services/store.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Deserialize } from 'cerialize';
import { DefaultMapper } from '@core/utils/api-mapper';
import { environment } from '../../../environments/environment';

const TC_INTERNET = '/api/v1/tc-internet';
const TC_MOBILE = '/api/v1/tc-mobile';

@Injectable()
export class LocationFeaturesService extends RestApiService<LocationFeatures, LocationFeatures, LocationFeatures> {

  constructor(private httpClient: HttpClient, private storeService: StoreService) {
    super(httpClient, storeService, TC_INTERNET, new DefaultMapper()); // todo: remove default mapper
  }

  internetFeaturesList(): Observable<LocationFeatures[]> {
    const token = this.storeService.get('token');
    let headers;

    if (token) {
      headers = new HttpHeaders().append('Authorization', `Token ${token}`);
    }

    const params = new HttpParams();
      // .append('parent', '1904');

    return this.httpClient.get(TC_INTERNET, {params, headers})
      .pipe(map(value => Deserialize(value, LocationFeatures)));
  }

  cellularFeaturesList(): Observable<LocationFeatures[]> {
    const token = this.storeService.get('token');
    let headers;

    if (token) {
      headers = new HttpHeaders().append('Authorization', `Token ${token}`);
    }

    const params = new HttpParams();
      // .append('parent', '1904');

    return this.httpClient.get(TC_MOBILE, {params, headers})
      .pipe(map(value => Deserialize(value, LocationFeatures)));
  }

  one(id: number): Observable<LocationFeatures> {
    return super.one(id)
      .pipe(map(value => Deserialize(value, LocationFeatures)));
  }

  exportExcelCellular() {
    window.location.href = (environment.API_BASE_URL + '/api/v1/tc-mobile/export/?');
  }

  exportExcelInternet() {
    window.location.href = (environment.API_BASE_URL + '/api/v1/tc-internet/export/?');
  }
}
