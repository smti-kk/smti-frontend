import {LocationSearchResult} from '@api/dto/LocationSearchResult';
import {LocationSearchGroup, LocationSearchItem} from '../dto/LocationSearchOptions';
import {LocationSearchResultConverter} from './LocationSearchResultConverter';

export class LocationSearchResultConverterImpl implements LocationSearchResultConverter {

  /**
   * Группирация локации по районам
   * @param searchResult - несгруппированные данные
   */
  convert(searchResult: LocationSearchResult[]): LocationSearchGroup[] {
    const grouped = new Map<string, LocationSearchItem[]>();
    searchResult.forEach(sr => {
      let previous = grouped.get(sr.parentType + ' ' + sr.parentName);
      if (!previous) {
        previous = [];
      }
      previous.push({id: sr.id, label: sr.type + ' ' + sr.name});
      grouped.set(sr.parentType + ' ' + sr.parentName, previous);
    });
    const result: LocationSearchGroup[] = [];
    grouped.forEach((value, key) => {
      result.push({label: key, locations: value});
    });
    return result;
  }
}
