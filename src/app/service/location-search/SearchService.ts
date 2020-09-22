import {LocationSearchGroup} from '../dto/LocationSearchOptions';
import {Observable} from 'rxjs';

export abstract class SearchService {
  abstract search(searchString: string): Observable<LocationSearchGroup[]>;
}
