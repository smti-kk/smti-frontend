import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { StoreService } from './store.service';
import { RestApiService } from './common/rest-api-service';
import { ACCOUNT_INFO, ESIA_LOGIN, LOGIN } from '../constants/api';
import { UserMapper } from '../utils/user-mapper';

@Injectable({
  providedIn: SharedModule,
})
export class AuthService extends RestApiService<User, User, User> {

  private _user: Subject<User> = new ReplaySubject<User>(1);

  constructor(private httpClient: HttpClient, private storeService: StoreService) {
    super(httpClient, storeService, ACCOUNT_INFO, new UserMapper());

    this.accountInfo.subscribe(user => {
      this.user.next(user);
    }, () => {
      this.user.next(null);
    });
  }

  login(options: { email: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(environment.API_BASE_URL + LOGIN, options)
      .pipe(
        tap(response => {
          this.storeService.set('token', response.token);

          this.accountInfo.subscribe(ai => {
            this.user.next(ai);
          });
        })
      );
  }

  loginEsia(oauthToken: string) {
    this.httpClient.post<any>(environment.API_BASE_URL + ESIA_LOGIN, {token: oauthToken})
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
    return this.one();
  }

  logout() {
    this.storeService.clear('token');
    this.user.next(null);
  }
}
