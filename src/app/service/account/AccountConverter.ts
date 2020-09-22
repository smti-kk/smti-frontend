import {Account} from './Account';

export interface AccountConverter<T> {
  convert(value: T): Account;
}
