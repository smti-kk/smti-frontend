import {Observable} from 'rxjs';
import {UserFromApi} from '../dto/UserFromApi';

export interface UsersApi {
  list(): Observable<UserFromApi[]>;

  update(item: UserFromApi): Observable<UserFromApi>;

  create(item: UserFromApi): Observable<UserFromApi>;

  updatePassword(id: number, pwd: string): Observable<UserFromApi>;
}

