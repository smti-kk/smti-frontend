import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TvTypeApi} from './TvTypeApi';
import {TV_TYPES_API} from '../../../environments/api.routes';
import {TvType} from '../dto/TvType';

export class TvTypeApiImpl implements TvTypeApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  list(): Observable<TvType[]> {
    return this.httpClient.get<TvType[]>(TV_TYPES_API);
  }
}
