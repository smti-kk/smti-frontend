import {RoleConverter} from './RoleConverter';
import {UserRole} from './UserRole';

export class RoleConverterFromStringArray implements RoleConverter<string[]> {
  convert(value: string[]): UserRole[] {
    return value as UserRole[];
  }
}
