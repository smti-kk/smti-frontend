import {HttpClient} from '@angular/common/http';
import {BaseStation} from '../dto/BaseStation';
import {Observable} from 'rxjs';
import {TRUNK_CHANNEL_API} from '../../../environments/api.routes';
import {TrunkChannel} from '../dto/TrunkChannel';

export class TrunkChannelsApi {
  constructor(private httpClient: HttpClient) {
  }

  create(station: BaseStation): Observable<TrunkChannel> {
    return this.httpClient.post<TrunkChannel>(`${TRUNK_CHANNEL_API}`, station);
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${TRUNK_CHANNEL_API}/${id}`);
  }

  update(station: BaseStation): Observable<TrunkChannel> {
    return this.httpClient.put<TrunkChannel>(`${TRUNK_CHANNEL_API}`, station);
  }

  list(): Observable<TrunkChannel[]> {
    return this.httpClient.get<TrunkChannel[]>(`${TRUNK_CHANNEL_API}`);
  }

  findOne(id: number): Observable<TrunkChannel> {
    return this.httpClient.get<TrunkChannel>(`${TRUNK_CHANNEL_API}/${id}`);
  }
}
