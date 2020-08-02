import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TvTypeApi} from './TvTypeApi';
import {TV_TYPES_API} from '../../../environments/api.routes';
import {Signal} from '../dto/Signal';

export class TvTypeApiImpl implements TvTypeApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  list(): Observable<Signal[]> {
    return this.httpClient.get<Signal[]>(TV_TYPES_API);
  }
}
