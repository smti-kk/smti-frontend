import { RestApiService } from '@shared/services/common/rest-api-service';
import { LocationCapabilities } from '@shared/models/location-capabilities';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StoreService } from '@shared/services/store.service';
import { LocationCapabilitiesMapper } from '@shared/utils/location-capabilities.mapper';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const LTC = '/api/v1/ltc';

export enum FilterType {
  ASC,
  DSC,
  UNDEFINED
}

@Injectable()
export class TcPivotsService extends RestApiService<LocationCapabilities, LocationCapabilities, LocationCapabilities> {
  constructor(private httpClient: HttpClient, private storeService: StoreService, private capabilitiesMapper: LocationCapabilitiesMapper) {
    super(httpClient, storeService, LTC, capabilitiesMapper);
  }
}

@Injectable()
export class FilterTcPivotsService extends TcPivotsService {
  private params: HttpParams = new HttpParams();

  list(): Observable<LocationCapabilities[]> {
    const params = this.params
      .set('parent', '2093');
    return super.list(params);
  }

  addFilterOrdering(fieldName: string, filterType: FilterType) {
    if (filterType === FilterType.ASC) {
      this.params = this.params.set('ordering', fieldName);
    } else if (filterType === FilterType.DSC) {
      this.params = this.params.set('ordering', '-' + fieldName);
    } else {
      this.params = this.params.delete('ordering');
    }
  }
}

