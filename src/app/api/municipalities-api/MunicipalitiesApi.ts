import {HttpClient} from '@angular/common/http';
import {LocationArea} from './LocationArea';
import {LOCATION_AREA_URL} from '../../../environments/api.routes';
import {Observable} from 'rxjs';

export class MunicipalitiesApi {
  constructor(private httpClient: HttpClient) {
  }

  list(): Observable<LocationArea[]> {
    return this.httpClient.get<LocationArea[]>(LOCATION_AREA_URL);
  }
}
