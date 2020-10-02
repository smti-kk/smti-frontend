import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BASE_STATIONS_API} from '../../../environments/api.routes';
import {BaseStation} from '../dto/BaseStation';
import {Pageable} from '@api/dto/Pageable';

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
    return this.httpClient.put<BaseStation>(`${BASE_STATIONS_API}`, station);
  }

  list(): Observable<BaseStation[]>;
  list(page: number, size: number): Observable<Pageable<BaseStation[]>>;
  list(page?: number, size?: number): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    if (size) {
      params = params.set('size', size.toString());
    }
    return this.httpClient.get(`${BASE_STATIONS_API}`, {params});
  }

  findOne(id: number): Observable<BaseStation> {
    return this.httpClient.get<BaseStation>(`${BASE_STATIONS_API}/${id}`);
  }
}
