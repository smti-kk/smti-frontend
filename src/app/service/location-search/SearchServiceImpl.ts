import {SearchService} from './SearchService';
import {LocationSearchGroup} from '../dto/LocationSearchOptions';
import {Observable} from 'rxjs';
import {LocationSearchApi} from '@api/locations/LocationSearchApi';
import {LocationSearchResultConverter} from '@service/location-search/LocationSearchResultConverter';
import {map} from 'rxjs/operators';

export class SearchServiceImpl implements SearchService {
  private readonly searchApi: LocationSearchApi;
  private readonly locationSearchResultConverter: LocationSearchResultConverter;

  constructor(searchApi: LocationSearchApi,
              locationSearchResultConverter: LocationSearchResultConverter) {
    this.searchApi = searchApi;
    this.locationSearchResultConverter = locationSearchResultConverter;
  }

  search(searchString: string): Observable<LocationSearchGroup[]> {
    return this.searchApi.search(searchString).pipe(
      map(response => {
        return this.locationSearchResultConverter.convert(response).map(group => {
          return {
            id: group.id,
            label: group.label,
            locations: group.locations.filter(l => l.label.toLowerCase().includes(searchString.toLowerCase()))
          };
        });
      })
    );
  }
}
