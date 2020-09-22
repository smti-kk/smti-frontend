import {LocationTableItem} from '../dto/LocationTableItem';
import {LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';
import {NotStrictFilter} from './NotStrictFilter';

export class NotStrictFilterImpl extends NotStrictFilter {
  filter(locations: LocationTableItem[], locationFilters: LocationFilters): LocationTableItem[] {
    return locations;
  }
}
