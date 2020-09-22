import {autoserializeAs} from 'cerialize';

export class Operator {
  @autoserializeAs('id')
  private readonly _id: number;

  @autoserializeAs('name')
  private readonly _name: string;

  @autoserializeAs('icon')
  private readonly _icon: string;

  constructor(id: number, name: string, icon: string) {
    this._id = id;
    this._name = name;
    this._icon = icon;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get icon(): string {
    return this._icon;
  }
}
