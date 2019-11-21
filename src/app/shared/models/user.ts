export class User {
  constructor(
    private _email: string
  ) {}


  get email(): string {
    return this._email;
  }
}
