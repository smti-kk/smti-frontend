import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LocationFeatures} from '@core/models';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Deserialize, Serialize} from 'cerialize';
import {PaginatedList} from '@core/models/paginated-list';

const LTC = environment.API_BASE_URL + '/api/v1/technical-capabilities';
const CLARIFY_PETITION = environment.API_BASE_URL + '/api/v1/in-clarify-petition/';
const ACCEPT_PETITION = environment.API_BASE_URL + '/api/v1/in-clarify-petition/accept/?id=:id';
const REJECT_PETITION = environment.API_BASE_URL + '/api/v1/in-clarify-petition/reject/?id=:id';

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
      .get<any>(LTC, {params})
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
      .get(LTC + `/${id}/`)
      .pipe(map(response => Deserialize(response, LocationFeatures)));
  }

  save(value: LocationFeatures) {

    value.cellular = value.cellular.filter((c: any) => c._operator !== null); // todo: исправить any
    value.post = value.post.filter((c: any) => c._operator !== null); // todo: исправить any
    value.radio = value.radio.filter((c: any) => c._operator !== null); // todo: исправить any
    value.television = value.television.filter((c: any) => c._operator !== null); // todo: исправить any
    value.internet = value.internet.filter((c: any) => c._operator !== null); // todo: исправить any
    value.ats = value.ats.filter((c: any) => c._operator !== null); // todo: исправить any

    console.log('request', value, Serialize(value, LocationFeatures));
    return this.httpClient.post(CLARIFY_PETITION, Serialize(value, LocationFeatures));
  }

  accept(id: number) {
    return this.httpClient.get(ACCEPT_PETITION.replace(':id', id.toString()));
  }

  reject(id: number) {
    return this.httpClient.get(REJECT_PETITION.replace(':id', id.toString()));
  }

  exportExcel(params?: HttpParams) {
    if (params) {
      window.location.href = environment.API_BASE_URL + '/api/v1/ltc/export/?' + params.toString();
    } else {
      window.location.href = environment.API_BASE_URL + '/api/v1/ltc/export/';
    }
  }
}
