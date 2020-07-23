import {AccountService} from './AccountService';
import {Observable, ReplaySubject} from 'rxjs';
import {UserRole} from './UserRole';
import {AccountApi} from '@api/account/account.api';
import {Account} from '@service/account/Account';
import {AccountFromApi} from '@api/dto/AccountFromApi';
import {AccountConverter} from '@service/account/AccountConverter';

export class AccountServiceImpl implements AccountService {
  private readonly currentAccount: ReplaySubject<Account>;

  constructor(private accountApi: AccountApi,
              private accountConverter: AccountConverter<AccountFromApi>) {
    this.currentAccount = new ReplaySubject<Account>(1);
    this.accountApi.get().subscribe(account => {
      this.currentAccount.next(accountConverter.convert(account));
    });
  }

  get(): ReplaySubject<Account> {
    return this.currentAccount;
  }

  getRole(): Observable<UserRole[]> {
    return new Observable<UserRole[]>(subscriber => {
      const subscription = this.currentAccount.subscribe(account => {
        subscriber.next(account.getRole());
        subscription.unsubscribe();
      });
    });
  }

  updateAccount(): void {
    this.accountApi.get().subscribe(account => {
      this.currentAccount.next(this.accountConverter.convert(account));
    });
  }
}
