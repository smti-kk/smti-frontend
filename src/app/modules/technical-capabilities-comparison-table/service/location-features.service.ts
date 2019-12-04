import { Injectable } from '@angular/core';
import { RestApiService } from '@core/services/common/rest-api-service';
import { LocationFeatures } from '@core/models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StoreService } from '@core/services/store.service';
import { DefaultMapper } from '@shared/utils/api-mapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Deserialize } from 'cerialize';

const LTCR = '/api/v1/ltcr';

@Injectable()
export class LocationFeaturesService extends RestApiService<LocationFeatures, LocationFeatures, LocationFeatures> {

  constructor(http: HttpClient, store: StoreService) {
    super(http, store, LTCR, new DefaultMapper()); // todo: remove default mapper
  }

  list(): Observable<LocationFeatures[]> {
    const params = new HttpParams().append('parent', '1904');

    return super.list(params)
      .pipe(map(value => Deserialize(value, LocationFeatures)));
  }
}
