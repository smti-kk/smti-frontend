import {autoserializeAs} from 'cerialize';

export class GovernmentProgram {
  @autoserializeAs('id')
  private readonly _id: number;

  @autoserializeAs('acronym')
  private readonly _acronym: string;

  @autoserializeAs('name')
  private readonly _name: string;

  @autoserializeAs('description')
  private readonly _description: string;

  constructor(id: number, acronym: string, name: string, description: string) {
    this._id = id;
    this._acronym = acronym;
    this._name = name;
    this._description = description;
  }

  get acronym(): string {
    return this._acronym;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get id(): number {
    return this._id;
  }
}
