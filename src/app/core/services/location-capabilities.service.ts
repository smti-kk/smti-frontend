import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from './common/rest-api-service';
import { StoreService } from './store.service';
import { LocationCapabilities } from '@core/models';
import { LocationCapabilitiesMapper } from '@core/utils/location-capabilities.mapper';
import { TECHNICAL_CAPABILITIES } from '@core/constants/api';

@Injectable()
export class LocationCapabilitiesService extends RestApiService<LocationCapabilities, LocationCapabilities, LocationCapabilities> {
  constructor(private httpClient: HttpClient, private storeService: StoreService) {
    super(httpClient, storeService, TECHNICAL_CAPABILITIES, new LocationCapabilitiesMapper());
  }
}
