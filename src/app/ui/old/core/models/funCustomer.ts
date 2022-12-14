import { autoserializeAs } from 'cerialize';

export type FunCustomerApType = 'SMO' | 'ESPD' | 'GENERAL';

export interface IFunCustomer {
  id: number;
  name: string;
  apType: FunCustomerApType;
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

  @autoserializeAs('apType')
  private readonly _apType: FunCustomerApType;
  public get apType(): FunCustomerApType {
    return this._apType;
  }
}
