import {Injectable} from '@angular/core';
import {
  GovernmentProgram,
  Location,
  LocationFeatures,
  MobileGeneration,
  Operator,
  PaginatedList,
  TrunkChannel,
} from '@core/models';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Deserialize} from 'cerialize';
import {environment} from '../../../environments/environment';
import {TECHNICAL_CAPABILITIES} from '@core/constants/api';
import {OrderingFilter} from '@shared/layout/filter-btn/filter-btn.component';
import {OrderingDirection} from '@core/services/tc-pivots.service';
import {FeatureTypes} from '../../modules/technical-capabilities-comparison-table/technical-capabilities-comparision-table';

const TC_INTERNET = '/api/v1/tc-internet/';
const TC_MOBILE = '/api/v1/tc-mobile/';

interface Filters {
  order: OrderingFilter;
  govProgram: GovernmentProgram;
  location: Location;
  parent: Location;
  internetType: TrunkChannel;
  internet: {[providerId: string]: boolean}[];
  mobile: {[providerId: string]: boolean}[];
  mobileType: MobileGeneration;
}

@Injectable()
export class LocationFeaturesService {
  protected params: HttpParams = new HttpParams();
  protected filters: Filters;

  constructor(private httpClient: HttpClient) {}

  getInternetFeaturesList(params?: HttpParams): Observable<PaginatedList<LocationFeatures>> {
    let requestParams = params;

    console.log(requestParams.keys());

    if (params && params.has('mobile_type')) {
      requestParams = params.delete('mobile_type');
    }

    if (params && params.has('mobile_operator')) {
      requestParams = params.delete('mobile_operator');
    }

    console.log(requestParams.toString());

    return this.httpClient
      .get<any>(TC_INTERNET, {params: requestParams})
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
    let requestParams = params;

    if (params && params.has('internet_type')) {
      requestParams = params.delete('internet_type');
    }

    if (params && params.has('internet_operator')) {
      requestParams = params.delete('internet_operator');
    }

    console.log(requestParams.toString());

    return this.httpClient
      .get<any>(TC_MOBILE, {params: requestParams})
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

  paginatedListInternet(
    page: number,
    pageSize: number
  ): Observable<PaginatedList<LocationFeatures>> {
    console.log('paginatedListINternet:', this.params);
    return this.getInternetFeaturesList(
      this.params.set('page', page.toString()).set('page_size', pageSize.toString())
    );
  }

  paginatedListCellular(
    page: number,
    pageSize: number
  ): Observable<PaginatedList<LocationFeatures>> {
    return this.getCellularFeaturesList(
      this.params.set('page', page.toString()).set('page_size', pageSize.toString())
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

  filter(filters: Filters) {
    this.filters = filters;
    this.setOrder(filters.order);
    this.setParamId('location', filters.location);
    this.setParamId('parent', filters.parent);
    this.setParamId('govenmet_programs', filters.govProgram);
    this.setInternetOperatorFilter(filters.internet);
    this.setParamType('internet_type', filters.internetType);
    this.setMobileOperatorFilter(filters.mobile);
    this.setParamType('mobile_type', filters.mobileType);
  }

  private setMobileOperatorFilter(providers: {[providerId: string]: boolean}[]) {
    if (!providers) {
      return;
    }

    this.params = this.params.delete('mobile_operator');

    providers
      .filter(provider => Object.values(provider)[0] === true)
      .forEach(provider => {
        this.params = this.params.append('mobile_operator', Object.keys(provider)[0]);
      });
  }

  private setInternetOperatorFilter(providers: {[providerId: string]: boolean}[]) {
    if (!providers) {
      return;
    }

    this.params = this.params.delete('internet_operator');

    providers
      .filter(provider => Object.values(provider)[0] === true)
      .forEach(provider => {
        this.params = this.params.append('internet_operator', Object.keys(provider)[0]);
      });
  }

  private setOrder(order?: OrderingFilter) {
    if (order && order.orderingDirection === OrderingDirection.ASC) {
      this.params = this.params.set('ordering', order.name);
    } else if (order && order.orderingDirection === OrderingDirection.DSC) {
      this.params = this.params.set('ordering', '-' + order.name);
    } else {
      this.params = this.params.delete('ordering');
    }
  }

  private setParamId(field: string, value: {id: number}) {
    if (value) {
      this.params = this.params.set(field, value.id.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }

  private setParamType(field: string, value: {type: number}) {
    if (value) {
      this.params = this.params.set(field, value.type.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }
}
