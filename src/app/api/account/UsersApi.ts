import {Observable} from 'rxjs';
import {UserFromApi} from '../dto/UserFromApi';
import {HttpParams} from '@angular/common/http';
import {Pageable} from '@api/dto/Pageable';

export interface UsersApi {
  list(): Observable<UserFromApi[]>;

  pageList(params: HttpParams): Observable<Pageable<UserFromApi[]>>;

  update(item: UserFromApi): Observable<UserFromApi>;

  create(item: UserFromApi): Observable<UserFromApi>;

  updatePassword(id: number, pwd: string): Observable<UserFromApi>;
}

