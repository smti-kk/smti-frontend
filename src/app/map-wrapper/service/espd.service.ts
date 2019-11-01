import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessPointEspd } from '../model/access-point-espd';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ACCESS_POINT_ESPD_URL } from '../constants/api.constants';
import { RestApiService } from '../../shared/services/common/rest-api-service';
import { EspdMapper } from '@map-wrapper/utils/espd-mapper';
import { StoreService } from '../../shared/services/store.service';
import { LatLngBounds } from 'leaflet';

@Injectable()
export class EspdService extends RestApiService<AccessPointEspd, AccessPointEspd, AccessPointEspd> {
  constructor(httpClient: HttpClient,
              store: StoreService) {
    super(httpClient, store, ACCESS_POINT_ESPD_URL, new EspdMapper());
  }

  public list(): Observable<AccessPointEspd[]> {
    return super.list();
  }

  public listFilteredByBounds(bounds: LatLngBounds) {
    const httpParams = new HttpParams()
      .set('bbox', `${bounds.getSouthWest().lng},${bounds.getSouthWest().lat},${bounds.getNorthEast().lng},${bounds.getNorthEast().lat}`);

    return super.list(httpParams);
  }
}
