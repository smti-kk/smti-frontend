import {LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';
import {Observable} from 'rxjs';

export abstract class LocationFiltersInitialization {
  abstract init(): Observable<LocationFilters>;
}

