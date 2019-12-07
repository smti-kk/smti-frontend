import { autoserializeAs } from 'cerialize';
import { SignalType } from '@core/models/enums';

export class Signal {
  @autoserializeAs('id')
  private readonly _id: SignalType;

  @autoserializeAs('name')
  private readonly _name: string;


  constructor(id: SignalType, name: string) {
    this._id = id;
    this._name = name;
  }

  get id(): SignalType {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get shortName() {
    if (this.id === SignalType.ATV) {
      return 'АТВ';
    } else if (this.id === SignalType.CTV) {
      return 'ЦТВ';
    }
  }
}
