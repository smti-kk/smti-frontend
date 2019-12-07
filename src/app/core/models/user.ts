import { autoserializeAs } from 'cerialize';

export class User {

  @autoserializeAs('email')
  private readonly _email: string;

  constructor(email: string) {
    this._email = email;
  }

  get email(): string {
    return this._email;
  }
}
