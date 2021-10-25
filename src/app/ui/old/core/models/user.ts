import {autoserializeAs} from 'cerialize';

export class User {
  @autoserializeAs('id')
  private readonly _id: number;
  @autoserializeAs('username')
  private readonly _username: string;
  @autoserializeAs('isActive')
  private readonly _isActive: boolean;
  @autoserializeAs('oid')
  private readonly _oid: number;
  @autoserializeAs('email')
  private readonly _email: string;
  @autoserializeAs('firstName')
  private readonly _firstName: string;
  @autoserializeAs('lastName')
  private readonly _lastName: string;
  @autoserializeAs('patronymicName')
  private readonly _patronymicName: string;
  @autoserializeAs('roles')
  private readonly _roles: string[];

  constructor(
    id: number,
    username: string,
    isActive: boolean,
    oid: number,
    email: string,
    firstName: string,
    lastName: string,
    patronymicName: string,
    roles: string[]
  ) {
    this._id = id;
    this._username = username;
    this._isActive = isActive;
    this._oid = oid;
    this._email = email;
    this._firstName = firstName;
    this._lastName = lastName;
    this._patronymicName = patronymicName;
    this._roles = roles;
  }

  get id(): number {
    return this._id;
  }

  get oid(): number {
    return this._oid;
  }

  get username(): string {
    return this._username;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get email(): string {
    return this._email;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get patronymicName(): string {
    return this._patronymicName;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  get roles(): string[] {
    return this.roles;
  }
}
