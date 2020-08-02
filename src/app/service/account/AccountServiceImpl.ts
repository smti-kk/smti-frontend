import {AccountService} from './AccountService';
import {Observable, ReplaySubject} from 'rxjs';
import {UserRole} from './UserRole';
import {AccountApi} from '@api/account/account.api';
import {Account} from '@service/account/Account';
import {AccountFromApi} from '@api/dto/AccountFromApi';
import {AccountConverter} from '@service/account/AccountConverter';
import {map} from 'rxjs/operators';

export class AccountServiceImpl implements AccountService {
  constructor(private accountApi: AccountApi,
              private accountConverter: AccountConverter<AccountFromApi>) {
  }

  get(): Observable<Account> {
    return this.accountApi.get().pipe(
      map(account => this.accountConverter.convert(account))
    );
  }

  getRole(): Observable<UserRole[]> {
    return this.accountApi.get().pipe(
      map(account => this.accountConverter.convert(account).getRole())
    );
  }

  updateAccount(): void {
    // this.accountApi.get().subscribe(account => {
    //   this.currentAccount.next(this.accountConverter.convert(account));
    // });
  }
}
