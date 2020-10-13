import {Observable} from 'rxjs';
import {UserFromApi} from '../dto/UserFromApi';
import {UsersApi} from './UsersApi';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TRUNK_CHANNEL_API, USERS_API} from '../../../environments/api.routes';
import {Pageable} from '@api/dto/Pageable';

export class UsersApiImpl implements UsersApi {
  constructor(private httpClient: HttpClient) {
  }

  list(): Observable<UserFromApi[]> {
    return this.httpClient.get<UserFromApi[]>(USERS_API);
  }

  pageList(params: HttpParams): Observable<Pageable<UserFromApi[]>> {
    return this.httpClient.get<Pageable<UserFromApi[]>>(USERS_API, {params});
  }

  update(item: UserFromApi): Observable<UserFromApi> {
    return this.httpClient.put<UserFromApi>(USERS_API, item);
  }

  create(item: UserFromApi): Observable<UserFromApi> {
    return this.httpClient.post<UserFromApi>(USERS_API, item);
  }

  updatePassword(id: number, pwd: string): Observable<any> {
    return this.httpClient.put<any>(`${USERS_API}${id}/`, {value: pwd});
  }
}
