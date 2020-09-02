import {HttpClient} from '@angular/common/http';
import {LocationArea} from './LocationArea';
import {LOCATION_AREA_URL} from '../../../environments/api.routes';
import {Observable} from 'rxjs';

export abstract class MunicipalitiesApi {
  abstract list(): Observable<LocationArea[]>;
}


export class MunicipalitiesApiImpl implements MunicipalitiesApi {
  constructor(private httpClient: HttpClient) {
  }

  list(): Observable<LocationArea[]> {
    return this.httpClient.get<LocationArea[]>(LOCATION_AREA_URL);
  }
}
