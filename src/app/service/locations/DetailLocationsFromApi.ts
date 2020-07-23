import {DetailLocations} from './DetailLocations';
import {TechnicalCapabilityEdition} from '../dto/TechnicalCapabilityEdition';
import {LocationDetailApi} from '@api/locations/LocationDetailApi';
import {map} from 'rxjs/operators';
import {TcEditionFromApi} from '../dto/TcEditionFromApi';
import {Observable} from 'rxjs';

export class DetailLocationsFromApi implements DetailLocations {

  constructor(private readonly locationDetailApi: LocationDetailApi) {
  }

  location(id: string): Observable<TechnicalCapabilityEdition> {
    return this.locationDetailApi.one(parseInt(id, 10)).pipe(
      map(l => new TcEditionFromApi(l))
    );
  }

  save(tc: TcEditionFromApi): Observable<TechnicalCapabilityEdition> {
    return this.locationDetailApi.save(tc.toWriteableLocation()).pipe(
      map((location) => new TcEditionFromApi(location))
    );
  }
}
