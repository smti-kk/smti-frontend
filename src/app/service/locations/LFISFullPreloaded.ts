import {LocationsFullInformationService} from './LocationsFullInformationService';
import {LocationTableItem} from '../dto/LocationTableItem';
import {Pageable} from '@api/dto/Pageable';
import {Observable, of} from 'rxjs';
import {LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';
import {Paginator} from '@service/dto/Paginator';
import {LocationsFiltration} from '@service/locations/LocationsFiltration';
import {LocationDetailApi} from '@api/locations/LocationDetailApi';

export class LFISFullPreloaded implements LocationsFullInformationService {
  private readonly origin: LocationsFullInformationService;
  private cache: Paginator<LocationTableItem>;
  private readonly filtration: LocationsFiltration;
  private lastFilters: LocationFilters;

  constructor(origin: LocationsFullInformationService,
              private readonly api: LocationDetailApi,
              filtration: LocationsFiltration) {
    this.origin = origin;
    this.filtration = filtration;
  }

  filteredLocations(page: number, size: number, filters: LocationFilters): Observable<Pageable<LocationTableItem[]>> {
    this.lastFilters = filters;
    const locations = new Paginator(this.filtration.filter(this.cache.allElements(), filters));
    return of({
      totalElements: locations.totalElements(),
      content: locations.page(page, size)
    });
  }

  get(page: number, size: number): Observable<Pageable<LocationTableItem[]>> {
    this.cache = null;
    this.origin.get(0, 4000)
      .subscribe(response => {
        this.cache = new Paginator<LocationTableItem>(response.content);
      });
    if (this.cache) {
      return of({
        content: this.cache.page(page, size),
        totalElements: this.cache.totalElements()
      });
    } else {
      return this.origin.get(page, size);
    }
  }

  exportExcel(): void {
    if (!this.lastFilters) {
      this.api.exportExcel(this.cache.allElements().map(l => l.id)).subscribe();
    } else {
      this.api.exportExcel(this.filtration.filter(this.cache.allElements(), this.lastFilters).map(l => l.id)).subscribe();
    }
  }

  listByUser(): Observable<LocationTableItem[]> {
    return this.origin.listByUser();
  }
}
