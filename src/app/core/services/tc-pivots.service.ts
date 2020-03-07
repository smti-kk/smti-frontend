import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Deserialize, Serialize} from 'cerialize';
import {LocationFeatures} from '@core/models';
import {PaginatedList} from '@core/models/paginated-list';
import {PaginatedListBackend} from '@core/models/base-interfaces';

import {environment} from '../../../environments/environment';

const LTC = `${environment.API_BASE_URL}/api/v1/technical-capabilities`;
const CLARIFY_PETITION = `${environment.API_BASE_URL}/api/v1/in-clarify-petition/`;
const ACCEPT_PETITION = `${environment.API_BASE_URL}/api/v1/in-clarify-petition/accept/?id=:id`;
const REJECT_PETITION = `${environment.API_BASE_URL}/api/v1/in-clarify-petition/reject/?id=:id`;

export enum OrderingDirection {
  ASC,
  DSC,
  UNDEFINED,
}

@Injectable()
export class TcPivotsService {
  constructor(private httpClient: HttpClient) {}

  list(params?: HttpParams): Observable<PaginatedList<LocationFeatures>> {
    return this.httpClient
      .get<PaginatedListBackend>(LTC, {params})
      .pipe(
        map(response => {
          return {
            count: response.count,
            next: response.next,
            previous: response.previous,
            results: response.results.map(item => Deserialize(item, LocationFeatures)),
          };
        })
      );
  }

  one(id: number): Observable<LocationFeatures> {
    return this.httpClient
      .get(`${LTC}/${id}/`)
      .pipe(map(response => Deserialize(response, LocationFeatures)));
  }

  save(value: LocationFeatures): Observable<{id: number}> {
    const iValue = {...value} as LocationFeatures;
    iValue.cellular = TcPivotsService.filterNulls(value.cellular);
    iValue.post = TcPivotsService.filterNulls(value.post);
    iValue.radio = TcPivotsService.filterNulls(value.radio);
    iValue.television = TcPivotsService.filterNulls(value.television);
    iValue.internet = TcPivotsService.filterNulls(value.internet);
    iValue.ats = TcPivotsService.filterNulls(value.ats);

    return this.httpClient.post<{id: number}>(
      CLARIFY_PETITION,
      Serialize(iValue, LocationFeatures)
    );
  }

  accept(id: number): Observable<void> {
    return this.httpClient.get<void>(ACCEPT_PETITION.replace(':id', id.toString()));
  }

  reject(id: number): Observable<void> {
    return this.httpClient.get<void>(REJECT_PETITION.replace(':id', id.toString()));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static filterNulls(array: any[]): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return array.filter((c: any) => c._operator !== null); // todo: исправить any
  }

  static exportExcel(params?: HttpParams): void {
    if (params) {
      window.location.href = `${LTC}/export/?${params.toString()}`;
    } else {
      window.location.href = `${LTC}/export/`;
    }
  }
}
