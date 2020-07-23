import {AccountConverter} from './AccountConverter';
import {AccountFromApi} from '@api/dto/AccountFromApi';
import {Account} from './Account';
import {RoleConverter} from './RoleConverter';

export class AccountConverterFromApi implements AccountConverter<AccountFromApi> {
  constructor(private roleConverter: RoleConverter<string[]>) {
  }

  convert(value: AccountFromApi): Account {
    return new Account(this.roleConverter.convert(value.roles), value.firstName);
  }
}
