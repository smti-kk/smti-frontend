import { autoserializeAs } from 'cerialize';

export class GovernmentProgram {

  @autoserializeAs('id')
  private readonly _id: number;

  @autoserializeAs('short_name')
  private readonly _shortName: string;

  @autoserializeAs('full_name')
  private readonly _fullName: string;

  @autoserializeAs('description')
  private readonly _description: string;

  constructor(id: number, shortName: string, fullName: string, description: string) {
    this._id = id;
    this._shortName = shortName;
    this._fullName = fullName;
    this._description = description;
  }


  get shortName(): string {
    return this._shortName;
  }

  get fullName(): string {
    return this._fullName;
  }

  get description(): string {
    return this._description;
  }

  get id(): number {
    return this._id;
  }
}
