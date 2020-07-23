import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TvTypeApi} from './TvTypeApi';
import {TvType} from '../dto/TvType';

export class TTCacheable implements TvTypeApi {
  private readonly origin: TvTypeApi;
  private history: TvType[];

  constructor(origin: TvTypeApi) {
    this.origin = origin;
  }

  list(): Observable<TvType[]> {
    if (this.history) {
      return of(this.history);
    }
    return this.origin.list().pipe(
      tap(response => {
        this.history = response;
      })
    );
  }
}
