import {deserializeAs, inheritSerialization, serializeAs} from 'cerialize';
import {MOBILE_GENERATION_DESERIALIZER, MobileGeneration} from '@core/models/mobile-generation';
import {Quality} from '@core/models/enums';
import {LocationFeature} from '@core/models/location-feature';
import {Operator} from '@core/models/operator';
import {GovernmentProgram} from '@core/models/government-program';

@inheritSerialization(LocationFeature)
export class CellularFeature extends LocationFeature {
  @serializeAs(MobileGeneration, 'type')
  @deserializeAs(MOBILE_GENERATION_DESERIALIZER, 'type')
  private readonly _type: MobileGeneration;

  constructor(
    operator: Operator,
    quality: Quality,
    active: boolean,
    archive: boolean,
    completed: number,
    planYear: boolean,
    planTwoYear: boolean,
    governmentProgram: GovernmentProgram,
    type: MobileGeneration
  ) {
    super(operator, quality, active, archive, completed, planYear, planTwoYear, governmentProgram);
    this._type = type;
  }

  get type(): MobileGeneration {
    return this._type;
  }
}
