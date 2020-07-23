import {UserRole} from './UserRole';

export class Account {
  private readonly role: UserRole[];
  private readonly name: string;

  constructor(role: UserRole[], name: string) {
    this.role = role;
    this.name = name;
  }

  getRole(): UserRole[] {
    return this.role;
  }

  getName(): string {
    return this.name;
  }
}
