import {RoleConverter} from './RoleConverter';
import {UserRole} from './UserRole';

export class RoleConverterFromStringArray implements RoleConverter<string[]> {
  convert(value: string[]): UserRole[] {
    return value.map(role => {
      switch (role) {
        case 'ADMIN': {
          return UserRole.ADMIN;
        }
        case 'GUEST': {
          return UserRole.GUEST;
        }
        case 'MUNICIPALITY': {
          return UserRole.MUNICIPALITY;
        }
        case 'ORGANIZATION': {
          return UserRole.ORGANIZATION;
        }
        case 'OPERATOR': {
          return UserRole.OPERATOR;
        }
      }
    });
  }
}
