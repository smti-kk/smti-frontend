import { RestApiService } from '@shared/services/common/rest-api-service';
import { LocationCapabilities } from '@shared/models/location-capabilities';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StoreService } from '@shared/services/store.service';
import { LocationCapabilitiesMapper } from '@shared/utils/location-capabilities.mapper';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const LTC = '/api/v1/ltc';

@Injectable()
export class TcPivotsService extends RestApiService<LocationCapabilities, LocationCapabilities, LocationCapabilities> {
  constructor(private httpClient: HttpClient, private storeService: StoreService, private capabilitiesMapper: LocationCapabilitiesMapper) {
    super(httpClient, storeService, LTC, capabilitiesMapper);
  }
}

export enum FilterType {
  ASC,
  DES,
  UNDEFINED
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
    let filterValue;

    if (filterType === FilterType.ASC) {
      filterValue = fieldName;
    } else if (FilterType.DES) {
      filterValue = '-' + fieldName;
    } else {
      filterValue = '';
    }

    this.params = this.params.set('ordering', filterValue);
  }
}

