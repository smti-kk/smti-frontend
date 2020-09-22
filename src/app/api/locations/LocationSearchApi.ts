import {Observable} from 'rxjs';
import {LocationSearchResult} from '../dto/LocationSearchResult';

export interface LocationSearchApi {
  search(str: string): Observable<LocationSearchResult[]>;
}

