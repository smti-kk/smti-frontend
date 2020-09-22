import {AccountApi} from './account.api';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ACCOUNT_API} from '../../../environments/api.routes';
import {AccountFromApi} from '@api/dto/AccountFromApi';

export class AccountApiImpl implements AccountApi {
  constructor(private httpClient: HttpClient) {
  }

  get(): Observable<AccountFromApi> {
    return this.httpClient.get<AccountFromApi>(ACCOUNT_API);
  }
}
