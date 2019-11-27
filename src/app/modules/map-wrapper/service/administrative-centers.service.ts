import { RestApiService } from '@shared/services/common/rest-api-service';
import { AdministrativeCenterPoint } from '../model/administrative-center-point';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StoreService } from '@shared/services/store.service';
import { LOCATION_URL } from '../constants/api.constants';
import { AdministrativeCentersMapper } from '../utils/administrative-centers-mapper';
import { Injectable } from '@angular/core';
import { LatLngBounds } from 'leaflet';

@Injectable()
export class AdministrativeCentersService
  extends RestApiService<AdministrativeCenterPoint, AdministrativeCenterPoint, AdministrativeCenterPoint> {
  constructor(httpClient: HttpClient,
              store: StoreService) {
    super(httpClient, store, LOCATION_URL, new AdministrativeCentersMapper());
  }

  listFilteredByBounds(bounds: LatLngBounds) {
    const httpParams = new HttpParams()
      .set('bbox', `${bounds.getSouthWest().lng},${bounds.getSouthWest().lat},${bounds.getNorthEast().lng},${bounds.getNorthEast().lat}`);

    return super.list(httpParams);
  }

  listFilteredByArea(areaId) {
    const httpParams = new HttpParams()
      .set('parent', areaId.toString());

    return super.list(httpParams);
  }
}
