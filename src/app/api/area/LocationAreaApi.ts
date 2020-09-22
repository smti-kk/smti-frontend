import {Observable} from 'rxjs';
import {LocationAreaShort} from '../dto/LocationAreaShort';

export abstract class LocationAreaApi {
  abstract areas(): Observable<LocationAreaShort[]>;
}

