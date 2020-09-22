import {LocationTableItem} from '../dto/LocationTableItem';
import {LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';
import {LocationsFiltration} from './LocationsFiltration';
import {StrictFilter} from '@service/locations/StrictFilter';

export class LocationsFiltrationImpl implements LocationsFiltration {
  private readonly strictFilter: StrictFilter;

  constructor(strictFilter: StrictFilter) {
    this.strictFilter = strictFilter;
  }

  filter(locations: LocationTableItem[], locationFilters: LocationFilters): LocationTableItem[] {
    if (!locationFilters) {
      return locations;
    }
    return this.strictFilter.filter(locations, locationFilters);
  }
}
