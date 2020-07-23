import {Observable} from 'rxjs';
import {TvType} from '../dto/TvType';

export abstract class TvTypeApi {
  abstract list(): Observable<TvType[]>;
}

