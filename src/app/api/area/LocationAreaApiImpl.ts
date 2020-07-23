import {Observable} from 'rxjs';
import {LocationAreaShort} from '../dto/LocationAreaShort';
import {LocationAreaApi} from './LocationAreaApi';
import {HttpClient} from '@angular/common/http';
import {LOCATION_AREAS_API} from '../../../environments/api.routes';

export class LocationAreaApiImpl implements LocationAreaApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  areas(): Observable<LocationAreaShort[]> {
    return this.httpClient.get<LocationAreaShort[]>(LOCATION_AREAS_API);
  }
}
