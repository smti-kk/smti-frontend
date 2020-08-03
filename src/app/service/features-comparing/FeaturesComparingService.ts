import {Observable} from 'rxjs';
import {FeaturesComparing} from '../dto/FeaturesComparing';

export abstract class FeaturesComparingService {
  abstract featuresComparing(): Observable<FeaturesComparing[]>;
  abstract makeItActive(locationId: number, featureId: number): Observable<void>;
}

