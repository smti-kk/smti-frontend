import {Observable} from 'rxjs';

export abstract class AuthorizationService {
  abstract authorize(email: string, password: string): Observable<void>;
}


