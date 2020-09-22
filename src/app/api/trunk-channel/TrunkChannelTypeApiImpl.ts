import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TrunkChannelType} from '../dto/TrunkChannelType';
import {TrunkChannelTypeApi} from './TrunkChannelTypeApi';
import {TRUNK_CHANNEL_TYPES_API} from '../../../environments/api.routes';

export class TrunkChannelTypeApiImpl implements TrunkChannelTypeApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  list(): Observable<TrunkChannelType[]> {
    return this.httpClient.get<TrunkChannelType[]>(TRUNK_CHANNEL_TYPES_API);
  }
}
