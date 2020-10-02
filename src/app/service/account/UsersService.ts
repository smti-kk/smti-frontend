import {Observable} from 'rxjs';
import {UserFromApi} from '@api/dto/UserFromApi';

export abstract class UsersService {
  abstract list(): Observable<UserFromApi[]>;
  abstract update(item: UserFromApi): Observable<UserFromApi>;
  abstract create(item: UserFromApi): Observable<UserFromApi>;
}

