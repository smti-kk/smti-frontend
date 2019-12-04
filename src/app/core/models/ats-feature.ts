import { autoserializeAs, inheritSerialization } from 'cerialize';
import { LocationFeature } from '@core/models/location-feature';
import { Operator } from '@core/models/operator';
import { Quality } from '@core/models/enums';

@inheritSerialization(LocationFeature)
export class AtsFeature extends LocationFeature {

  @autoserializeAs('quantity_payphone')
  private readonly _quantityPayphone: number;

  constructor(operator: Operator, quality: Quality, active: boolean,
              archive: boolean, planYear: boolean, planTwoYear: boolean, quantityPayphone: number) {
    super(operator, quality, active, archive, planYear, planTwoYear);
    this._quantityPayphone = quantityPayphone;
  }

  get quantityPayphone(): number {
    return this._quantityPayphone;
  }
}
