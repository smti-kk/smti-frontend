import {Injectable} from '@angular/core';
import {LocationFeatures, PaginatedList} from '@core/models';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Deserialize} from 'cerialize';
import {environment} from '../../../environments/environment';
import {TECHNICAL_CAPABILITIES} from '@core/constants/api';

const TC_INTERNET = '/api/v1/tc-internet';
const TC_MOBILE = '/api/v1/tc-mobile';

@Injectable()
export class LocationFeaturesService {
  protected paramsInternet: HttpParams = new HttpParams();
  protected paramsCellular: HttpParams = new HttpParams();

  constructor(private httpClient: HttpClient) {
  }

  getInternetFeaturesList(params?: HttpParams): Observable<PaginatedList<LocationFeatures>> {
    return this.httpClient
      .get<any>(TC_INTERNET, {params})
      .pipe(
        map(response => {
          return {
            count: response.count,
            next: response.next,
            previous: response.previous,
            results: response.results.map(item => Deserialize(item, LocationFeatures)),
          };
        })
      );
  }

  getCellularFeaturesList(params?: HttpParams): Observable<PaginatedList<LocationFeatures>> {
    return this.httpClient
      .get<any>(TC_MOBILE, {params})
      .pipe(
        map(response => {
          return {
            count: response.count,
            next: response.next,
            previous: response.previous,
            results: response.results.map(item => Deserialize(item, LocationFeatures)),
          };
        })
      );
  }

  paginatedListInternet(page: number, pageSize: number): Observable<PaginatedList<LocationFeatures>> {
    return this.getInternetFeaturesList(
      this.paramsInternet.set('page', page.toString()).set('page_size', pageSize.toString())
    );
  }

  paginatedListCellular(page: number, pageSize: number): Observable<PaginatedList<LocationFeatures>> {
    return this.getCellularFeaturesList(
      this.paramsCellular.set('page', page.toString()).set('page_size', pageSize.toString())
    );
  }

  exportExcelCellular() {
    window.location.href = environment.API_BASE_URL + '/api/v1/tc-mobile/export/?';
  }

  exportExcelInternet() {
    window.location.href = environment.API_BASE_URL + '/api/v1/tc-internet/export/?';
  }

  oneLocationFeature(id: number): Observable<LocationFeatures> {
    return this.httpClient
      .get(TECHNICAL_CAPABILITIES + `/${id}/`)
      .pipe(map(value => Deserialize(value, LocationFeatures)));
  }
}
