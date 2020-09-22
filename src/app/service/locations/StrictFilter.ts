import {LocationsFiltration} from './LocationsFiltration';
import {LocationTableItem} from '../dto/LocationTableItem';
import {LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';

export abstract class StrictFilter implements LocationsFiltration {
  abstract filter(locations: LocationTableItem[], locationFilters: LocationFilters): LocationTableItem[];
}
