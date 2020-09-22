import {LocationTableItem} from '../dto/LocationTableItem';
import {LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';

export interface LocationsFiltration {
  filter(locations: LocationTableItem[], locationFilters: LocationFilters): LocationTableItem[];
}
