import { RestApiService } from '@core/services/common/rest-api-service';
import { AccessPointSmo } from '../model/access-point-smo';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StoreService } from '@core/services/store.service';
import { ACCESS_POINT_SMO_URL } from '../constants/api.constants';
import { SmoMapper } from '../utils/smo-mapper';
import { LatLngBounds } from 'leaflet';
import { Injectable } from '@angular/core';

@Injectable()
export class SmoService extends RestApiService<AccessPointSmo, AccessPointSmo, AccessPointSmo> {
  constructor(httpClient: HttpClient,
              store: StoreService) {
    super(httpClient, store, ACCESS_POINT_SMO_URL, new SmoMapper());
  }

  public listFilteredByBounds(bounds: LatLngBounds) {
    const httpParams = new HttpParams()
      .set('bbox', `${bounds.getSouthWest().lng},${bounds.getSouthWest().lat},${bounds.getNorthEast().lng},${bounds.getNorthEast().lat}`);

    return super.list(httpParams);
  }
}
