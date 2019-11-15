import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';
import { LocationCapabilities } from '../models/location-capabilities';
import { HttpClient } from '@angular/common/http';
import { TECHNICAL_CAPABILITIES } from '../constants/api';
import { RestApiService } from './common/rest-api-service';
import { LocationCapabilitiesMapper } from '../utils/location-capabilities.mapper';
import { StoreService } from './store.service';

@Injectable({
  providedIn: SharedModule
})
export class LocationCapabilitiesService extends RestApiService<LocationCapabilities, LocationCapabilities, LocationCapabilities> {
  constructor(private httpClient: HttpClient, private storeService: StoreService) {
    super(httpClient, storeService, TECHNICAL_CAPABILITIES, new LocationCapabilitiesMapper());
  }
}
