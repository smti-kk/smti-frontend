import {AccountService} from './AccountService';
import {Observable, of} from 'rxjs';
import {UserRole} from './UserRole';
import {AccountApi} from '@api/account/account.api';
import {Account} from '@service/account/Account';
import {AccountFromApi} from '@api/dto/AccountFromApi';
import {AccountConverter} from '@service/account/AccountConverter';
import {catchError, map, shareReplay} from 'rxjs/operators';

export class AccountServiceImpl implements AccountService {
  private readonly account: Observable<Account>;

  constructor(private accountApi: AccountApi,
              private accountConverter: AccountConverter<AccountFromApi>) {
    this.account = this.accountApi.get().pipe(
      catchError(() => of(null)),
      map(account => this.accountConverter.convert(account)),
      shareReplay(1)
    );
  }

  get(): Observable<Account> {
    return this.account;
  }

  getRole(): Observable<UserRole[]> {
    return this.account.pipe(
      map(account => {
        if (account === null) {
          return ['GUEST'];
        }
        return account.getRole();
      })
    );
  }

  updateAccount(): void {
    // this.accountApi.get().subscribe(account => {
    //   this.currentAccount.next(this.accountConverter.convert(account));
    // });
  }
}
