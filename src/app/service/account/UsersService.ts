import {Observable} from 'rxjs';
import {UserFromApi} from '@api/dto/UserFromApi';
import {BaseStationFilters} from '@api/base-stations/BaseStationsApi';
import {Pageable} from '@api/dto/Pageable';

export abstract class UsersService {
  abstract list(): Observable<UserFromApi[]>;

  abstract pageList(page?: number,
                    size?: number,
                    filters?: any): Observable<Pageable<UserFromApi[]>>;

  abstract update(item: UserFromApi): Observable<UserFromApi>;

  abstract create(item: UserFromApi): Observable<UserFromApi>;

  abstract updatePassword(id: number, pwd: string): Observable<UserFromApi>;
}

