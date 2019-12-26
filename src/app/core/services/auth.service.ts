import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map, tap} from 'rxjs/operators';
import {StoreService} from './store.service';
import {User} from '@core/models';
import {ACCOUNT_INFO, ESIA_LOGIN, LOGIN} from '@core/constants/api';
import {Deserialize} from 'cerialize';

@Injectable()
export class AuthService {
  private _user: Subject<User> = new ReplaySubject<User>(1);

  constructor(private httpClient: HttpClient, private storeService: StoreService) {
    this.accountInfo.subscribe(
      user => {
        this.user.next(user);
      },
      () => {
        this.user.next(null);
      }
    );
  }

  login(options: {email: string; password: string}): Observable<{token: string}> {
    return this.httpClient.post<{token: string}>(environment.API_BASE_URL + LOGIN, options).pipe(
      tap(response => {
        this.storeService.set('token', response.token);

        this.accountInfo.subscribe(ai => {
          this.user.next(ai);
        });
      })
    );
  }

  loginEsia(oauthToken: string) {
    this.httpClient
      .post<any>(environment.API_BASE_URL + ESIA_LOGIN, {temp_token: oauthToken})
      .subscribe(response => {
        this.storeService.set('token', response.token);

        this.accountInfo.subscribe(ai => {
          this.user.next(ai);
        });
      });
  }

  get user() {
    return this._user;
  }

  get accountInfo(): Observable<User> {
    return this.httpClient.get(ACCOUNT_INFO).pipe(map(response => Deserialize(response, User)));
  }

  logout() {
    this.storeService.clear('token');
    this.user.next(null);
  }
}
