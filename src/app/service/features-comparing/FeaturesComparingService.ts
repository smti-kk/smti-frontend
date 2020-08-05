import {Observable} from 'rxjs';
import {FeaturesComparing} from '../dto/FeaturesComparing';
import {TechnicalCapabilityType} from '@api/dto/TechnicalCapabilityType';

export abstract class FeaturesComparingService {
  abstract featuresComparing(type?: TechnicalCapabilityType): Observable<FeaturesComparing[]>;
  abstract makeItActive(locationId: number, featureId: number): Observable<void>;
}

