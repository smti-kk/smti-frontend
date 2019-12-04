import { autoserializeAs, inheritSerialization } from 'cerialize';
import { MobileGeneration } from '@core/models/mobile-generation';
import { Quality } from '@core/models/enums';
import { LocationFeature } from '@core/models/location-feature';
import { Operator } from '@core/models/operator';

@inheritSerialization(LocationFeature)
export class CellularFeature extends LocationFeature {

  @autoserializeAs(MobileGeneration, 'type')
  private readonly _type: MobileGeneration;


  constructor(operator: Operator, quality: Quality, active: boolean,
              archive: boolean, planYear: boolean, planTwoYear: boolean, type: MobileGeneration) {
    super(operator, quality, active, archive, planYear, planTwoYear);
    this._type = type;
  }

  get type(): MobileGeneration {
    return this._type;
  }
}
