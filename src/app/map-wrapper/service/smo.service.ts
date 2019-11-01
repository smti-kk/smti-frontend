import { RestApiService } from '../../shared/services/common/rest-api-service';
import { AccessPointSmo } from '@map-wrapper/model/access-point-smo';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StoreService } from '../../shared/services/store.service';
import { ACCESS_POINT_SMO_URL } from '@map-wrapper/constants/api.constants';
import { SmoMapper } from '@map-wrapper/utils/smo-mapper';
import { Observable } from 'rxjs';
import { LatLngBounds } from 'leaflet';
import { Injectable } from '@angular/core';

@Injectable()
export class SmoService extends RestApiService<AccessPointSmo, AccessPointSmo, AccessPointSmo> {
  constructor(httpClient: HttpClient,
              store: StoreService) {
    super(httpClient, store, ACCESS_POINT_SMO_URL, new SmoMapper());
  }

  public list(): Observable<AccessPointSmo[]> {
    return super.list();
  }

  public listFilteredByBounds(bounds: LatLngBounds): Observable<AccessPointSmo[]> {
    const httpParams = new HttpParams()
      .set('bbox', `${bounds.getSouthWest().lng},${bounds.getSouthWest().lat},${bounds.getNorthEast().lng},${bounds.getNorthEast().lat}`);

    return super.list(httpParams);
  }
}
