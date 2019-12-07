import { autoserializeAs } from 'cerialize';
import { MailType, Quality } from '@core/models/enums';
import { Operator } from '@core/models/operator';
import { LocationFeature } from '@core/models/location-feature';

export class PostFeature extends LocationFeature {
  @autoserializeAs('type')
  private readonly _type: MailType;


  constructor(operator: Operator, quality: Quality, active: boolean, archive: boolean, planYear: boolean, planTwoYear: boolean, type: MailType) {
    super(operator, quality, active, archive, planYear, planTwoYear);
    this._type = type;
  }


  get type(): MailType {
    return this._type;
  }
}
