import {Observable} from 'rxjs';
import {LocationFeaturesSaveRequest} from '@api/dto/LocationDetail';

export abstract class LocationFeatures {
  abstract saveAll(features: LocationFeaturesSaveRequest, locationId: number): Observable<void>;
}
