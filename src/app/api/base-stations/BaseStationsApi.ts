import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BASE_STATIONS_API} from '../../../environments/api.routes';
import {BaseStation} from '../dto/BaseStation';

export class BaseStationsApi {
  constructor(private httpClient: HttpClient) {
  }

  create(station: BaseStation): Observable<BaseStation> {
    return this.httpClient.post<BaseStation>(`${BASE_STATIONS_API}`, station);
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${BASE_STATIONS_API}/${id}`);
  }

  update(station: BaseStation): Observable<BaseStation> {
    console.log(station);
    return this.httpClient.put<BaseStation>(`${BASE_STATIONS_API}`, station);
  }

  list(): Observable<BaseStation[]> {
    return this.httpClient.get<BaseStation[]>(`${BASE_STATIONS_API}`);
  }

  findOne(id: number): Observable<BaseStation> {
    return this.httpClient.get<BaseStation>(`${BASE_STATIONS_API}/${id}`);
  }
}
