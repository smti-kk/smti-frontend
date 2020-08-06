import {LocationsFullInformationService} from './LocationsFullInformationService';
import {Observable} from 'rxjs';
import {Pageable} from '@api/dto/Pageable';
import {LocationTableItem} from '../dto/LocationTableItem';
import {LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';
import {Throttle} from '../util/Throttle';

export class LFISThrottled implements LocationsFullInformationService {
  private readonly origin: LocationsFullInformationService;
  private readonly throttle: Throttle;

  constructor(origin: LocationsFullInformationService,
              throttle: Throttle) {
    this.origin = origin;
    this.throttle = throttle;
  }

  filteredLocations(page: number, size: number, filters: LocationFilters): Observable<Pageable<LocationTableItem[]>> {
    return this.throttle.throttle(this.origin.filteredLocations(page, size, filters));
  }

  get(page: number, size: number): Observable<Pageable<LocationTableItem[]>> {
    return this.throttle.throttle(this.origin.get(page, size));
  }

  exportExcel(): void {
    this.origin.exportExcel();
  }
}
