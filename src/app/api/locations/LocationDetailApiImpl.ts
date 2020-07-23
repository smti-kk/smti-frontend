import {Observable} from 'rxjs';
import {LocationDetail, WriteableLocation} from '../dto/LocationDetail';
import {LocationDetailApi} from './LocationDetailApi';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LOCATION_DETAIL_API} from '../../../environments/api.routes';
import {Pageable} from '@api/dto/Pageable';

export class LocationDetailApiImpl implements LocationDetailApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  list(page: number, size: number): Observable<Pageable<LocationDetail[]>> {
    const params = new HttpParams({
      fromObject: {
        page: page.toString(),
        size: size.toString()
      }
    });
    return this.httpClient.get<Pageable<LocationDetail[]>>(LOCATION_DETAIL_API, {params});
  }

  listFiltered(page: number, size: number, filters: HttpParams): Observable<Pageable<LocationDetail[]>> {
    const params = filters
      .append('page', page.toString())
      .append('size', size.toString());
    return this.httpClient.get<Pageable<LocationDetail[]>>(LOCATION_DETAIL_API, {params});
  }

  one(id: number): Observable<LocationDetail> {
    return this.httpClient.get<LocationDetail>(`${LOCATION_DETAIL_API}/${id}`);
  }

  save(location: WriteableLocation): Observable<LocationDetail> {
    return this.httpClient.post<LocationDetail>(LOCATION_DETAIL_API, location);
  }
}
