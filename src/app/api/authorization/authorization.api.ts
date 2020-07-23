import {Observable} from 'rxjs';

export interface AuthorizationApi {
  authorize(email: string, password: string): Observable<{token: string}>;
}
