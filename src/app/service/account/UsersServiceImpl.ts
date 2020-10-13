import {Observable} from 'rxjs';
import {UserFromApi} from '@api/dto/UserFromApi';
import {UsersService} from './UsersService';
import {UsersApi} from '@api/account/UsersApi';
import {BaseStationFilters} from '@api/base-stations/BaseStationsApi';
import {HttpParams} from '@angular/common/http';
import {Pageable} from '@api/dto/Pageable';

export class UsersServiceImpl implements UsersService {
  private readonly usersApi: UsersApi;

  constructor(usersApi: UsersApi) {
    this.usersApi = usersApi;
  }

  list(): Observable<UserFromApi[]> {
    return this.usersApi.list();
  }

  pageList(page?: number, size?: number, filters?: any): Observable<Pageable<UserFromApi[]>> {
    let params = new HttpParams();
    if (page !== null && page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (size) {
      params = params.set('size', size.toString());
    }
    return this.usersApi.pageList(params);
  }

  update(item: UserFromApi): Observable<UserFromApi> {
    return this.usersApi.update(item);
  }

  create(item: UserFromApi): Observable<UserFromApi> {
    return this.usersApi.create(item);
  }

  updatePassword(id: number, pwd: string): Observable<UserFromApi> {
    return this.usersApi.updatePassword(id, pwd);
  }
}
