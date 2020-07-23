import {LocationTableItem} from '../dto/LocationTableItem';
import {LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';
import {LocationsFiltration} from './LocationsFiltration';
import {StrictFilter} from '@service/locations/StrictFilter';
import {NotStrictFilter} from '@service/locations/NotStrictFilter';

export class LocationsFiltrationImpl implements LocationsFiltration {
  private readonly strictFilter: StrictFilter;
  private readonly notStrictFilter: NotStrictFilter;

  constructor(strictFilter: StrictFilter,
              notStrictFilter: NotStrictFilter) {
    this.strictFilter = strictFilter;
    this.notStrictFilter = notStrictFilter;
  }

  filter(locations: LocationTableItem[], locationFilters: LocationFilters): LocationTableItem[] {
    if (locationFilters.logicalCondition === 'OR') {
      return this.notStrictFilter.filter(locations, locationFilters);
    }
    if (locationFilters.logicalCondition === 'AND') {
      return this.strictFilter.filter(locations, locationFilters);
    }
    throw Error('unknown condition: ' + locationFilters.logicalCondition);
  }
}
