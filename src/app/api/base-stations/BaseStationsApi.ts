import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BASE_STATIONS_API} from '../../../environments/api.routes';
import {BaseStation} from '../dto/BaseStation';
import {Pageable} from '@api/dto/Pageable';
import {LocationFilter} from '../../ui/locations-page/location-filters/LocationFilters';

export interface BaseStationFilters {
  operatorIds?: LocationFilter[];
  typeMobiles?: LocationFilter[];
  coverageRadiusLeftBorder?: number;
  coverageRadiusRightBorder?: number;
  propHeightLeftBorder?: number;
  propHeightRightBorder?: number;
  actionDateFrom?: string;
  actionDateTo?: string;
  address?: string;
}

export class BaseStationsApi {
  constructor(private httpClient: HttpClient) {
  }

  create(station: BaseStation): Observable<BaseStation> {
    return this.httpClient.post<BaseStation>(`${BASE_STATIONS_API}`, station);
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${BASE_STATIONS_API}/${id}`);
  }

  update(station: BaseStation): Observable<BaseStation> {
    return this.httpClient.put<BaseStation>(`${BASE_STATIONS_API}`, station);
  }

  list(): Observable<BaseStation[]>;
  list(page: number,
       size: number,
       filters?: BaseStationFilters | any
  ): Observable<Pageable<BaseStation[]>>;
  list(page?: number, size?: number, filters?: BaseStationFilters): Observable<any> {
    if (!filters) {
      filters = {};
    }
    let params = new HttpParams();
    if (page !== null && page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (size) {
      params = params.set('size', size.toString());
    }
    if (filters.actionDateFrom) {
      const date = new Date(filters.actionDateFrom).toISOString();
      params = params.set('actionDateFrom', date);
    }
    if (filters.actionDateTo) {
      const date = new Date(filters.actionDateTo).toISOString();
      params = params.set('actionDateTo', date);
    }
    if (filters.address) {
      params = params.set('address', filters.address);
    }
    if (filters.coverageRadiusLeftBorder !== null && filters.coverageRadiusLeftBorder !== undefined) {
      params = params.set('coverageRadiusLeftBorder', filters.coverageRadiusLeftBorder.toString());
    }
    if (filters.coverageRadiusRightBorder !== null && filters.coverageRadiusRightBorder !== undefined) {
      params = params.set('coverageRadiusRightBorder', filters.coverageRadiusRightBorder.toString());
    }
    if (filters.propHeightLeftBorder !== null && filters.propHeightLeftBorder !== undefined) {
      params = params.set('propHeightLeftBorder', filters.propHeightLeftBorder.toString());
    }
    if (filters.propHeightRightBorder !== null && filters.propHeightRightBorder !== undefined) {
      params = params.set('propHeightRightBorder', filters.propHeightRightBorder.toString());
    }
    if (filters.operatorIds) {
      const operatorIds = filters.operatorIds
        .filter(oid => oid.isSelected)
        .map(oid => oid.id);
      if (operatorIds.length > 0) {
        params = params.set('operatorIds', operatorIds.join(','));
      }
    }
    if (filters.typeMobiles) {
      const typeMobiles = filters.typeMobiles
        .filter(oid => oid.isSelected)
        .map(oid => oid.id);
      if (typeMobiles.length > 0) {
        params = params.set('typeMobiles', typeMobiles.join(','));
      }
    }
    return this.httpClient.get(`${BASE_STATIONS_API}`, {params});
  }

  findOne(id: number): Observable<BaseStation> {
    return this.httpClient.get<BaseStation>(`${BASE_STATIONS_API}/${id}`);
  }
}
