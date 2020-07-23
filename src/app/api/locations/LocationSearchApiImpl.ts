import {Observable} from 'rxjs';
import {LocationSearchResult} from '../dto/LocationSearchResult';
import {LocationSearchApi} from './LocationSearchApi';
import {HttpClient} from '@angular/common/http';
import {MAP_LOCATIONS_API} from '../../../environments/api.routes';

export class LocationSearchApiImpl implements LocationSearchApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  search(str: string): Observable<LocationSearchResult[]> {
    return this.httpClient.get<LocationSearchResult[]>(MAP_LOCATIONS_API, {
      params: {
        search: str
      }
    });
  }
}
