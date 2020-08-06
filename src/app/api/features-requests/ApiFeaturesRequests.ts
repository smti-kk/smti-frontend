import {Observable} from 'rxjs';
import {LocationFeatureEditingRequest} from '../dto/LocationFeatureEditingRequest';

export abstract class ApiFeaturesRequests {
  abstract requests(locationId: number): Observable<LocationFeatureEditingRequest[]>;
  abstract archive(locationId: number): Observable<LocationFeatureEditingRequest[]>;
  abstract plan(locationId: number): Observable<LocationFeatureEditingRequest[]>;
}
