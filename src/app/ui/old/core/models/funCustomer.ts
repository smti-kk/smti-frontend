import {autoserializeAs, deserializeAs, serializeAs} from 'cerialize';

export interface IFunCustomer {
  id: number;
  name: string;
}

export class FunCustomer implements IFunCustomer {
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
