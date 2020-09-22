import {UserRole} from './UserRole';
import {Account} from '@service/account/Account';

export abstract class AccountService {
  abstract getRole(): Observable<UserRole[]>;
  abstract get(): Observable<Account>;
  abstract updateAccount(): void;
}
