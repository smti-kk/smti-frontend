import { RestApiService } from '@shared/services/common/rest-api-service';
import { LocationCapabilities } from '@shared/models/location-capabilities';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StoreService } from '@shared/services/store.service';
import { LocationCapabilitiesMapper } from '@shared/utils/location-capabilities.mapper';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const LTC = '/api/v1/ltc';

@Injectable()
export class TcPivotsService extends RestApiService<LocationCapabilities, LocationCapabilities, LocationCapabilities> {
  constructor(private httpClient: HttpClient, private storeService: StoreService) {
    super(httpClient, storeService, LTC, new LocationCapabilitiesMapper());
  }

  list(): Observable<LocationCapabilities[]> {
    // const params = new HttpParams();
    //   .append('parent', '2093');
    //
    // return super.list(params);
    return of([]);
  }
}

@Injectable()
export class FilterTcPivotsService extends TcPivotsService {
  private httpParams = new HttpParams();

  addFilterByOrderingDesc(fields: string[]) {
    this.httpParams = this.httpParams.append('ordering', fields.join(','));
  }
}

