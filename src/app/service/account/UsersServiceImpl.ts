import {Observable} from 'rxjs';
import {UserFromApi} from '@api/dto/UserFromApi';
import {UsersService} from './UsersService';
import {UsersApi} from '@api/account/UsersApi';

export class UsersServiceImpl implements UsersService {
  private readonly usersApi: UsersApi;

  constructor(usersApi: UsersApi) {
    this.usersApi = usersApi;
  }

  list(): Observable<UserFromApi[]> {
    return this.usersApi.list();
  }

  update(item: UserFromApi): Observable<UserFromApi> {
    return this.usersApi.update(item);
  }

  create(item: UserFromApi): Observable<UserFromApi> {
    return this.usersApi.create(item);
  }
}
