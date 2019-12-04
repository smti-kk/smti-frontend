import { autoserializeAs } from 'cerialize';

export class GovernmentProgram {

  @autoserializeAs('id')
  private readonly _id: number;

  @autoserializeAs('short_name')
  private readonly _shortName: string;


  constructor(id: number, shortName: string) {
    this._id = id;
    this._shortName = shortName;
  }

  get shortName(): string {
    return this._shortName;
  }

  get id(): number {
    return this._id;
  }
}
