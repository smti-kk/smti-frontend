import {LocationsService} from './LocationsService';
import {LocationInfoBarValue} from '../dto/LocationInfoBarValue';
import {forkJoin, Observable, of} from 'rxjs';
import {LocationsApi} from '@api/locations/LocationsApi';
import {OperatorsApi} from '@api/operators/OperatorsApi';
import {map} from 'rxjs/operators';
import {LocationInfoBarConverter} from '@service/locations/LocationInfoBarConverter';

export class LocationsServiceImpl implements LocationsService {

  constructor(private locationsApi: LocationsApi,
              private operatorsApi: OperatorsApi,
              private locationInfoBarConverter: LocationInfoBarConverter) {
  }

  get(id: number): Observable<LocationInfoBarValue> {
    return forkJoin([
      this.locationsApi.get(id),
      this.operatorsApi.get()
    ]).pipe(
      map(([location, operators]) => {
        return this.locationInfoBarConverter.convert(location, operators);
      })
    );
  }
}
