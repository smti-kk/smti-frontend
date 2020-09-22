import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TvTypeApi} from './TvTypeApi';
import {Signal} from '../dto/Signal';

export class TTCacheable implements TvTypeApi {
  private readonly origin: TvTypeApi;
  private history: Signal[];

  constructor(origin: TvTypeApi) {
    this.origin = origin;
  }

  list(): Observable<Signal[]> {
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
