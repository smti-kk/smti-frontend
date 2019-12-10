import { Injectable } from '@angular/core';
import { LocationFeatures } from '@core/models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Deserialize } from 'cerialize';
import { environment } from '../../../environments/environment';
import { TECHNICAL_CAPABILITIES } from '@core/constants/api';

const TC_INTERNET = '/api/v1/tc-internet';
const TC_MOBILE = '/api/v1/tc-mobile';

@Injectable()
export class LocationFeaturesService {

  constructor(private httpClient: HttpClient) {
  }

  internetFeaturesList(): Observable<LocationFeatures[]> {
    const params = new HttpParams();
    // .append('parent', '1904');

    return this.httpClient.get(TC_INTERNET, {params})
      .pipe(map(value => Deserialize(value, LocationFeatures)));
  }

  cellularFeaturesList(): Observable<LocationFeatures[]> {
    const params = new HttpParams();
    // .append('parent', '1904');

    return this.httpClient.get(TC_MOBILE, {params})
      .pipe(map(value => Deserialize(value, LocationFeatures)));
  }

  exportExcelCellular() {
    window.location.href = (environment.API_BASE_URL + '/api/v1/tc-mobile/export/?');
  }

  exportExcelInternet() {
    window.location.href = (environment.API_BASE_URL + '/api/v1/tc-internet/export/?');
  }

  oneLocationFeature(id: number): Observable<LocationFeatures> {
    return this.httpClient.get(TECHNICAL_CAPABILITIES + `/${id}/`)
      .pipe(map(value => Deserialize(value, LocationFeatures)));
  }
}
