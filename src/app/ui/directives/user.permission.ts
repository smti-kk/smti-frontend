import {UserRole} from '@service/account/UserRole';

export class UserPermission {
  constructor(private readonly required: UserRole[],
              private readonly existed: UserRole[]) {
  }

  isAgreed(): boolean {
    let result = false;
    this.existed.forEach(role => {
      if (this.required.indexOf(role) !== -1) {
        result = true;
      }
    });
    return result;
  }
}
