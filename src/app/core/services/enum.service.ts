import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ExistingOperators, Provider } from '@core/models';
import { TECHNICAL_CAPABILITIES } from '@core/constants/api';
import { map } from 'rxjs/operators';
import { Deserialize } from 'cerialize';

const INTERNET_PROVIDER = '/api/v1/operator/internet';
const MOBILE_PROVIDER = '/api/v1/operator/mobile';

@Injectable()
export class EnumService {

  constructor(private httpClient: HttpClient, private storeService: StoreService) {

  }

  getInternetProvider(): Observable<Provider[]> {
    const token = this.storeService.get('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('Authorization', `Token ${token}`);
    }

    return this.httpClient.get<Provider[]>(environment.API_BASE_URL + INTERNET_PROVIDER, {headers});
  }

  getMobileProvider(): Observable<Provider[]> {
    const token = this.storeService.get('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('Authorization', `Token ${token}`);
    }

    return this.httpClient.get<Provider[]>(environment.API_BASE_URL + MOBILE_PROVIDER, {headers});
  }

  getExistingOperators(): Observable<ExistingOperators> {
    return this.httpClient.get<any>(TECHNICAL_CAPABILITIES + `/1111/`)
      .pipe(map(value => Deserialize(value.operators, ExistingOperators)));
  }

  // getExistingOperators(): Operator[] {
  //   const token = this.storeService.get('token');
  //   let headers = new HttpHeaders();
  //   if (token) {
  //     headers = headers.append('Authorization', `Token ${token}`);
  //   }
  //
  //   return this.httpClient.get<Operator[]>(environment.API_BASE_URL + MOBILE_PROVIDER, {headers});
  // }

}
