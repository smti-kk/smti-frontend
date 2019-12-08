import { autoserializeAs } from 'cerialize';
import { MailType, Quality } from '@core/models/enums';
import { Operator } from '@core/models/operator';
import { LocationFeature } from '@core/models/location-feature';
import { GovernmentProgram } from '@core/models/government-program';

export class PostFeature extends LocationFeature {
  @autoserializeAs('type')
  private readonly _type: MailType;


  constructor(operator: Operator, quality: Quality, active: boolean, archive: boolean, completed: number, planYear: boolean,
              planTwoYear: boolean, governmentProgram: GovernmentProgram, type: MailType) {
    super(operator, quality, active, archive, completed, planYear, planTwoYear, governmentProgram);
    this._type = type;
  }

  get type(): MailType {
    return this._type;
  }
}
