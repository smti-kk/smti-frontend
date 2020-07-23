import {Observable} from 'rxjs';
import {UserFromApi} from "../dto/UserFromApi";

export interface UsersApi {
  list(): Observable<UserFromApi[]>;

  update(item: UserFromApi): Observable<UserFromApi>;
}

