import {LocationTableItem} from '@service/dto/LocationTableItem';
import {Observable} from 'rxjs';
import {Pageable} from '@api/dto/Pageable';
import {LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';

export abstract class LocationsFullInformationService {
  abstract get(page: number, size: number): Observable<Pageable<LocationTableItem[]>>;
  abstract filteredLocations(page: number, size: number, filters: LocationFilters): Observable<Pageable<LocationTableItem[]>>;
}

