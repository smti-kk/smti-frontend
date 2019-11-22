import { Injectable } from '@angular/core';
import { StoreService } from '@shared/services/store.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Provider } from '@shared/models/location-capabilities';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

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

}