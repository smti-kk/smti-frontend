import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MobileTypeApi} from './MobileTypeApi';
import {MobileType} from '../dto/MobileType';

export class MTACacheable implements MobileTypeApi {
  private readonly origin: MobileTypeApi;
  private history: MobileType[];

  constructor(origin: MobileTypeApi) {
    this.origin = origin;
  }

  list(): Observable<MobileType[]> {
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
