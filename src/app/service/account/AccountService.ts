import {Observable, ReplaySubject} from 'rxjs';
import {UserRole} from './UserRole';
import {Account} from '@service/account/Account';

export abstract class AccountService {
  abstract getRole(): Observable<UserRole[]>;
  abstract get(): ReplaySubject<Account>;
  abstract updateAccount(): void;
}
