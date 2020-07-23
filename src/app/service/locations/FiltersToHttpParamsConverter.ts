import {LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';
import {HttpParams} from '@angular/common/http';

export interface FiltersToHttpParamsConverter {
  convert(locationFilters: LocationFilters): HttpParams;
}

