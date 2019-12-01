import { Injectable } from '@angular/core';
import { LocationArea } from '../model/location-area';
import { HttpClient } from '@angular/common/http';
import { LOCATION_AREA_URL } from '../constants/api.constants';
import { RestApiService } from '@core/services/common/rest-api-service';
import { StoreService } from '@core/services/store.service';
import { LocationAreaMapper } from '../utils/location-area-mapper';

@Injectable()
export class MunicipalityService extends RestApiService<LocationArea, LocationArea, LocationArea> {
  constructor(httpClient: HttpClient,
              store: StoreService) {
    super(httpClient, store, LOCATION_AREA_URL, new LocationAreaMapper());
  }
}


