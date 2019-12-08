import { autoserializeAs, inheritSerialization } from 'cerialize';
import { Quality, SignalType } from '@core/models/enums';
import { Operator } from '@core/models/operator';
import { LocationFeature } from '@core/models/location-feature';
import { GovernmentProgram } from '@core/models/government-program';

@inheritSerialization(LocationFeature)
export class RadioFeature extends LocationFeature {

  @autoserializeAs('type')
  private readonly _type: SignalType;


  constructor(operator: Operator, quality: Quality, active: boolean, archive: boolean, completed: number, planYear: boolean,
              planTwoYear: boolean, governmentProgram: GovernmentProgram, type: SignalType) {
    super(operator, quality, active, archive, completed, planYear, planTwoYear, governmentProgram);
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
