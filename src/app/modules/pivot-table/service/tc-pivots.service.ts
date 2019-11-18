import { RestApiService } from '../../../shared/services/common/rest-api-service';
import { LocationCapabilities } from '../../../shared/models/location-capabilities';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../../../shared/services/store.service';
import { LocationCapabilitiesMapper } from '../../../shared/utils/location-capabilities.mapper';
import { Injectable } from '@angular/core';

const LTC = '/api/v1/ltc/';

@Injectable()
export class TcPivotsService extends RestApiService<LocationCapabilities, LocationCapabilities, LocationCapabilities> {
  constructor(private httpClient: HttpClient, private storeService: StoreService) {
    super(httpClient, storeService, LTC, new LocationCapabilitiesMapper());
  }


}
