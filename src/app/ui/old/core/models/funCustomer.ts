import {autoserializeAs, deserializeAs, serializeAs} from 'cerialize';

export class FunCustomer {
  @autoserializeAs('id')
  private readonly _id: number;
  public get id(): number {
    return this._id;
  }

  @autoserializeAs('name')
  private readonly _name: string;
  public get name(): string {
    return this._name;
  }
}
