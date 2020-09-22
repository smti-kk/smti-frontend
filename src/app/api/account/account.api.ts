import {Observable} from 'rxjs';
import {AccountFromApi} from '@api/dto/AccountFromApi';

export interface AccountApi {
  get(): Observable<AccountFromApi>;
}
