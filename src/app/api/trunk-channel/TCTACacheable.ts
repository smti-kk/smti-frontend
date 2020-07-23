import {PostType} from '../dto/PostType';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TrunkChannelTypeApi} from './TrunkChannelTypeApi';
import {TrunkChannelType} from '../dto/TrunkChannelType';

export class TCTACacheable implements TrunkChannelTypeApi {
  private readonly origin: TrunkChannelTypeApi;
  private history: TrunkChannelType[];

  constructor(origin: TrunkChannelTypeApi) {
    this.origin = origin;
  }

  list(): Observable<TrunkChannelType[]> {
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
