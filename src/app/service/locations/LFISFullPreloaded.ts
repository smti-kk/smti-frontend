import {LocationsFullInformationService} from './LocationsFullInformationService';
import {LocationTableItem} from '../dto/LocationTableItem';
import {Pageable} from '@api/dto/Pageable';
import {Observable, of} from 'rxjs';
import {LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';
import {Paginator} from '@service/dto/Paginator';
import {LocationsFiltration} from '@service/locations/LocationsFiltration';

export class LFISFullPreloaded implements LocationsFullInformationService {
  private readonly origin: LocationsFullInformationService;
  private cache: Paginator<LocationTableItem>;
  private lastFilters: LocationFilters;
  private readonly filtration: LocationsFiltration;

  constructor(origin: LocationsFullInformationService,
              filtration: LocationsFiltration) {
    this.origin = origin;
    this.filtration = filtration;
    this.origin.get(0, 4000)
      .subscribe(response => {
        this.cache = new Paginator<LocationTableItem>(response.content);
      });
  }

  filteredLocations(page: number, size: number, filters: LocationFilters): Observable<Pageable<LocationTableItem[]>> {
    // if (this.cache && filters === this.lastFilters) {
    //   return of({
    //     content: this.cache.page(page, size),
    //     totalElements: this.cache.totalElements()
    //   });
    // } else {
    //   this.lastFilters = filters;
    //   this.origin.filteredLocations(0, 4000, filters).subscribe(response => {
    //     this.cache = new Paginator<LocationTableItem>(response.content);
    //   });
    //   return this.origin.filteredLocations(page, size, filters);
    // }
    const locations = new Paginator(this.filtration.filter(this.cache.allElements(), filters));
    return of({
      totalElements: locations.totalElements(),
      content: locations.page(page, size)
    });
  }

  get(page: number, size: number): Observable<Pageable<LocationTableItem[]>> {
    if (this.cache) {
      return of({
        content: this.cache.page(page, size),
        totalElements: this.cache.totalElements()
      });
    } else {
      return this.origin.get(page, size);
    }
  }
}
