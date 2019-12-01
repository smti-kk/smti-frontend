import { Injectable } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TECHNICAL_CAPABILITIES } from '@shared/constants/api';
import { RestApiService } from './common/rest-api-service';
import { LocationCapabilitiesMapper } from '@shared/utils/location-capabilities.mapper';
import { StoreService } from './store.service';
import { LocationCapabilities } from '@core/models';

@Injectable({
  providedIn: SharedModule
})
export class LocationCapabilitiesService extends RestApiService<LocationCapabilities, LocationCapabilities, LocationCapabilities> {
  constructor(private httpClient: HttpClient, private storeService: StoreService) {
    super(httpClient, storeService, TECHNICAL_CAPABILITIES, new LocationCapabilitiesMapper());
  }
}
