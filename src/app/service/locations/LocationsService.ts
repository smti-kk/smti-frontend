import {LocationInfoBarValue} from '../dto/LocationInfoBarValue';
import {Observable} from 'rxjs';

export abstract class LocationsService {
  abstract get(id: number): Observable<LocationInfoBarValue>;
}
