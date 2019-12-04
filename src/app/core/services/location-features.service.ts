import { Injectable } from '@angular/core';
import { RestApiService } from '@core/services/common/rest-api-service';
import { LocationFeatures } from '@core/models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StoreService } from '@core/services/store.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Deserialize } from 'cerialize';
import { DefaultMapper } from '@core/utils/api-mapper';
import { TECHNICAL_CAPABILITIES } from '@core/constants/api';

// const LTCR = '/api/v1/ltcr';

@Injectable()
export class LocationFeaturesService extends RestApiService<LocationFeatures, LocationFeatures, LocationFeatures> {

  constructor(http: HttpClient, store: StoreService) {
    super(http, store, TECHNICAL_CAPABILITIES, new DefaultMapper()); // todo: remove default mapper
  }

  list(): Observable<LocationFeatures[]> {
    const params = new HttpParams().append('parent', '1904');

    return super.list(params)
      .pipe(map(value => Deserialize(value, LocationFeatures)));
  }

  one(id: number): Observable<LocationFeatures> {
    return super.one(id)
      .pipe(map(value => Deserialize(value, LocationFeatures)));
  }
}
