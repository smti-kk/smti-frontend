import {Observable} from 'rxjs';
import {FeaturesComparing} from '../dto/FeaturesComparing';
import {TechnicalCapabilityType} from '@api/dto/TechnicalCapabilityType';
import {LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';
import {Pageable} from '@api/dto/Pageable';

export abstract class FeaturesComparingService {
  abstract featuresComparing(page: number, size: number, type: TechnicalCapabilityType): Observable<Pageable<FeaturesComparing[]>>;

  abstract featuresComparingFiltered(page: number,
                                     size: number,
                                     type: TechnicalCapabilityType,
                                     filters: LocationFilters): Observable<Pageable<FeaturesComparing[]>>;

  abstract featuresComparingExportExcel(type: TechnicalCapabilityType,
                                        filters: LocationFilters): Observable<void>;

  abstract makeItActive(locationId: number, featureId: number): Observable<void>;
}

