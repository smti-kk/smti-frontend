import {LocationsApi} from './LocationsApi';
import {LocationShort} from '../dto/LocationShort';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MAP_LOCATIONS_API} from '../../../environments/api.routes';

export class LocationsApiImpl implements LocationsApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  get(id: number): Observable<LocationShort> {
    return this.httpClient.get<LocationShort>(`${MAP_LOCATIONS_API}/${id}`);
  }
}
