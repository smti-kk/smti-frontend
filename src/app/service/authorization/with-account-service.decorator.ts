import {AccountService} from '../account/AccountService';
import {AuthorizationService} from './authorization.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

/**
 * Декоратор при авторизации уведомляет AccountService об этом
 */
export class WithUpdateUser implements AuthorizationService {
  constructor(private origin: AuthorizationService,
              private accountService: AccountService) {
  }

  authorize(email: string, password: string): Observable<void> {
    return this.origin.authorize(email, password).pipe(
      tap(() => {
        this.accountService.updateAccount();
      })
    );
  }

  logout(): void {
    this.origin.logout();
    this.accountService.updateAccount();
  }
}
