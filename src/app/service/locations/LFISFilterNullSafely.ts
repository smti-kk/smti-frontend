import {LocationsFullInformationService} from './LocationsFullInformationService';
import {LocationTableItem} from '../dto/LocationTableItem';
import {Pageable} from '@api/dto/Pageable';
import {Observable} from 'rxjs';
import {LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';

export class LFISFilterNullSafely implements LocationsFullInformationService {
  private readonly origin: LocationsFullInformationService;

  constructor(origin: LocationsFullInformationService) {
    this.origin = origin;
  }

  filteredLocations(page: number, size: number, filters: LocationFilters): Observable<Pageable<LocationTableItem[]>> {
    if (filters) {
      return this.origin.filteredLocations(page, size, filters);
    } else {
      return this.origin.get(page, size);
    }
  }

  get(page: number, size: number): Observable<Pageable<LocationTableItem[]>> {
    return this.origin.get(page, size);
  }

  exportExcel(): void {
    this.origin.exportExcel();
  }

  listByUser(): Observable<LocationTableItem[]> {
    return this.origin.listByUser();
  }
}
