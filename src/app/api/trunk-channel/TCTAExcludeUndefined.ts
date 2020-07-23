import {TrunkChannelTypeApi} from './TrunkChannelTypeApi';
import {Observable} from 'rxjs';
import {TrunkChannelType} from '../dto/TrunkChannelType';
import {map} from 'rxjs/operators';

export class TCTAExcludeUndefined implements TrunkChannelTypeApi {
  private readonly origin: TrunkChannelTypeApi;
  private readonly UNDEFINED_ID = 1;

  constructor(origin: TrunkChannelTypeApi) {
    this.origin = origin;
  }

  list(): Observable<TrunkChannelType[]> {
    return this.origin.list().pipe(
      map(types => {
        return types.filter(t => t.id !== this.UNDEFINED_ID);
      })
    );
  }
}
