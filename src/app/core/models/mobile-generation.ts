import { autoserializeAs } from 'cerialize';
import { MobileGenerationType } from '@core/models/enums';

export class MobileGeneration {
  @autoserializeAs('id')
  private readonly _type: MobileGenerationType;

  @autoserializeAs('name')
  private readonly _name: string;

  constructor(type: MobileGenerationType, name: string) {
    this._type = type;
    this._name = name;
  }

  get type(): MobileGenerationType {
    return this._type;
  }

  get name(): string {
    return this._name;
  }
}
