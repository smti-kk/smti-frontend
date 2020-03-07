import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Deserialize} from 'cerialize';
import {ExistingOperators, Operator} from '@core/models';
import {OPERATORS, INTERNET_PROVIDER, MOBILE_PROVIDER} from '@core/constants/api';

@Injectable()
export class EnumService {
  constructor(private httpClient: HttpClient) {}

  getInternetProvider(): Observable<Operator[]> {
    return this.httpClient
      .get<Operator[]>(INTERNET_PROVIDER)
      .pipe(map(value => Deserialize(value, Operator)));
  }

  getMobileProvider(): Observable<Operator[]> {
    return this.httpClient
      .get<Operator[]>(MOBILE_PROVIDER)
      .pipe(map(value => Deserialize(value, Operator)));
  }

  getExistingOperators(): Observable<ExistingOperators> {
    return this.httpClient
      .get<{}>(OPERATORS)
      .pipe(map(value => Deserialize(value, ExistingOperators)));
  }
}
