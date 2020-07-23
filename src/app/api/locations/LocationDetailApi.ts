import {LocationDetail, WriteableLocation} from '../dto/LocationDetail';
import {Observable} from 'rxjs';
import {Pageable} from '@api/dto/Pageable';
import {HttpParams} from '@angular/common/http';

export interface LocationDetailApi {
  list(page: number, size: number): Observable<Pageable<LocationDetail[]>>;
  listFiltered(page: number, size: number, filters: HttpParams): Observable<Pageable<LocationDetail[]>>;
  one(id: number): Observable<LocationDetail>;
  save(location: WriteableLocation): Observable<LocationDetail>;
}
