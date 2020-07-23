import {Observable} from 'rxjs';
import {MobileType} from '../dto/MobileType';
import {MobileTypeApi} from './MobileTypeApi';
import {HttpClient} from '@angular/common/http';
import {MOBILE_TYPES_API} from '../../../environments/api.routes';

export class MobileTypeApiImpl implements MobileTypeApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  list(): Observable<MobileType[]> {
    return this.httpClient.get<MobileType[]>(MOBILE_TYPES_API);
  }
}
