import { autoserializeAs, inheritSerialization } from 'cerialize';
import { Quality, SignalType } from '@core/models/enums';
import { Operator } from '@core/models/operator';
import { LocationFeature } from '@core/models/location-feature';

@inheritSerialization(LocationFeature)
export class RadioFeature extends LocationFeature {

  @autoserializeAs('type')
  private readonly _type: SignalType;

  constructor(operator: Operator, quality: Quality, active: boolean,
              archive: boolean, planYear: boolean, planTwoYear: boolean, type: SignalType) {
    super(operator, quality, active, archive, planYear, planTwoYear);
    this._type = type;
  }

  get type(): SignalType {
    return this._type;
  }

  get typeStr(): string {
    if (this.type === SignalType.ATV) {
      return 'АТВ';
    } else if (this.type === SignalType.CTV) {
      return 'ЦТВ';
    }
  }
}
