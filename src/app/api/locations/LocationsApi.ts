import {Observable} from 'rxjs';
import {LocationShort} from '../dto/LocationShort';

export interface LocationsApi {
  get(id: number): Observable<LocationShort>;
}
