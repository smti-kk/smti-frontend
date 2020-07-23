import {UserRole} from './UserRole';

export interface RoleConverter<T> {
  convert(value: T): UserRole[];
}
