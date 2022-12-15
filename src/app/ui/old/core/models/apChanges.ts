import { autoserializeAs } from 'cerialize';

export type APChangesApType = 'SMO' | 'ESPD' | 'GENERAL';

export interface IAPChanges {
  id: number;
  name: string;
}

export class APChanges implements IAPChanges {
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
  private readonly _apType: APChangesApType;
  public get apType(): APChangesApType {
    return this._apType;
  }
}
