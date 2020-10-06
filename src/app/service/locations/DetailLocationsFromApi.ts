import {DetailLocations} from './DetailLocations';
import {TechnicalCapabilityEdition} from '../dto/TechnicalCapabilityEdition';
import {LocationDetailApi} from '@api/locations/LocationDetailApi';
import {map} from 'rxjs/operators';
import {TcEditionFromApi} from '../dto/TcEditionFromApi';
import {Observable} from 'rxjs';
import {LocationFeatures} from '@api/location-features/LocationFeatures';

export class DetailLocationsFromApi implements DetailLocations {

  constructor(private readonly locationDetailApi: LocationDetailApi,
              private readonly locationFeatures: LocationFeatures) {
  }

  location(id: number): Observable<TechnicalCapabilityEdition> {
    return this.locationDetailApi.one(id).pipe(
      map(l => new TcEditionFromApi(l))
    );
  }

  save(tc: TcEditionFromApi, locationId: number): Observable<TechnicalCapabilityEdition> {
    return this.locationFeatures.saveAll(tc.toLocationFeaturesSaveRequest(), locationId).pipe(
      map((location) => null)
    );
  }

  saveWithComment(tc: TcEditionFromApi, locationId: number, comm: string): Observable<TechnicalCapabilityEdition> {
    return this.locationFeatures.saveAll(tc.toLocationFeaturesSaveRequestWithComment(comm), locationId).pipe(
      map((location) => null)
    );
  }

  sendRequest(tc: TcEditionFromApi, locationId: number): Observable<TechnicalCapabilityEdition> {
    return this.locationFeatures.sendRequest(tc.toLocationFeaturesSaveRequest(), locationId).pipe(
      map((location) => null)
    );
  }
}
