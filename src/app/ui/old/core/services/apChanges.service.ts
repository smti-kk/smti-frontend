import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ACCESS_POINT_CHANGES_LIST } from '@core/constants/api';
import { APChanges, IAPChanges } from '@core/models/apChanges';
import { GenericDeserialize } from 'cerialize';
import { map } from 'rxjs/operators';

@Injectable()
export class APChangesService {
  constructor(private readonly httpClient: HttpClient) {}

  getApChanges(): Observable<APChanges[]> {
    return this.httpClient
      .get<IAPChanges[]>(ACCESS_POINT_CHANGES_LIST)
      .pipe(
        map((rawChangesList) =>
          rawChangesList.map((rawChanges) =>
            GenericDeserialize<APChanges>(rawChanges, APChanges)
          )
        )
      );
  }
}
