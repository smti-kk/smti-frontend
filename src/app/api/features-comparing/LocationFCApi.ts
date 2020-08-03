import {Observable} from 'rxjs';
import {LocationFC} from '../dto/LocationFC';

export abstract class LocationFCApi {
  abstract locations(): Observable<LocationFC[]>;
  abstract makeItActive(locationId: number, featureId: number): Observable<void>;
}
