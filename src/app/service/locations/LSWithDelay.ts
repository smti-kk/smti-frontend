import {LocationsService} from './LocationsService';
import {Observable} from 'rxjs';
import {LocationInfoBarValue} from '../dto/LocationInfoBarValue';
import {delay} from 'rxjs/operators';

export class LSWithDelay implements LocationsService {
  private readonly origin: LocationsService;

  constructor(origin: LocationsService) {
    this.origin = origin;
  }

  get(id: number): Observable<LocationInfoBarValue> {
    return this.origin.get(id).pipe(
      delay(1000)
    );
  }
}
