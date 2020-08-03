import {Observable} from 'rxjs';
import {LocationFC} from '../dto/LocationFC';
import {LocationFCApi} from './LocationFCApi';
import {HttpClient} from '@angular/common/http';
import {LOCATION_FC_API} from '../../../environments/api.routes';

export class LocationFCApiImpl implements LocationFCApi {
  constructor(private readonly http: HttpClient) {
  }

  locations(): Observable<LocationFC[]> {
    return this.http.get<LocationFC[]>(LOCATION_FC_API);
  }

  makeItActive(locationId: number, featureId: number): Observable<void> {
    return this.http.post<void>(LOCATION_FC_API + `/${locationId}/${featureId}/activation`, {});
  }
}
