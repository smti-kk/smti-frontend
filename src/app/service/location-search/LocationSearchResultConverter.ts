import {LocationSearchGroup} from '../dto/LocationSearchOptions';
import {LocationSearchResult} from '@api/dto/LocationSearchResult';

export abstract class LocationSearchResultConverter {
  abstract convert(searchResult: LocationSearchResult[]): LocationSearchGroup[];
}
