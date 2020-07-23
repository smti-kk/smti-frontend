import {LocationAreaApi} from './LocationAreaApi';
import {Observable, of} from 'rxjs';
import {LocationAreaShort} from '../dto/LocationAreaShort';
import {tap} from 'rxjs/operators';

export class LAACacheable implements LocationAreaApi {
  private readonly origin: LocationAreaApi;
  private cache: LocationAreaShort[];

  constructor(origin: LocationAreaApi) {
    this.origin = origin;
  }

  areas(): Observable<LocationAreaShort[]> {
    if (this.cache) {
      return of(this.cache);
    }
    return this.origin.areas().pipe(
      tap(response => this.cache = response)
    );
  }
}
