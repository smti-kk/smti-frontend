import {HttpClient} from '@angular/common/http';
import {AuthorizationApi} from './authorization.api';
import {Observable} from 'rxjs';
import {AUTHORIZATION_API} from '../../../environments/api.routes';

export class AuthorizationApiImpl implements AuthorizationApi {
  constructor(private httpClient: HttpClient) {
  }

  authorize(email: string, password: string): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(AUTHORIZATION_API, {email, password});
  }
}
