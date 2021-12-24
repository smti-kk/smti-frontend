import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserFromApi} from '@api/dto/UserFromApi';
import {User} from '@core/models';
import {Deserialize} from 'cerialize';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {USERS_API} from 'src/environments/api.routes';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<UserFromApi[]> {
    const res = this.httpClient
      .get<UserFromApi[]>(USERS_API + 'all/')
      .pipe(map((response) => Deserialize(response, User)));

    return res;
  }
}
