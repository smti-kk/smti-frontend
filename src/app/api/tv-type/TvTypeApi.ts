import {Observable} from 'rxjs';
import {Signal} from '../dto/Signal';

export abstract class TvTypeApi {
  abstract list(): Observable<Signal[]>;
}

