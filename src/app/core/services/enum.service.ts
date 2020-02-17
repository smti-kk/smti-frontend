import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ExistingOperators, Operator} from '@core/models';
import {OPERATORS} from '@core/constants/api';
import {map} from 'rxjs/operators';
import {Deserialize} from 'cerialize';

const INTERNET_PROVIDER = '/api/v1/operator/internet';
const MOBILE_PROVIDER = '/api/v1/operator/mobile';

@Injectable()
export class EnumService {
  constructor(private httpClient: HttpClient) {}

  getInternetProvider(): Observable<Operator[]> {
    return this.httpClient
      .get<Operator[]>(environment.API_BASE_URL + INTERNET_PROVIDER)
      .pipe(map(value => Deserialize(value, Operator)));
  }

  getMobileProvider(): Observable<Operator[]> {
    return this.httpClient
      .get<Operator[]>(environment.API_BASE_URL + MOBILE_PROVIDER)
      .pipe(map(value => Deserialize(value, Operator)));
  }

  getExistingOperators(): Observable<ExistingOperators> {
    return this.httpClient
      .get<any>(OPERATORS)
      .pipe(map(value => Deserialize(value, ExistingOperators)));
  }
}
