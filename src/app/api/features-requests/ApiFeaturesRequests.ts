import {Observable} from 'rxjs';
import {LocationFeatureEditingRequest} from '../dto/LocationFeatureEditingRequest';

export abstract class ApiFeaturesRequests {
  abstract requests(locationId: number): Observable<LocationFeatureEditingRequest[]>;
}

