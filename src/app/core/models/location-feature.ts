import { Quality } from '@core/models/enums';
import { autoserializeAs } from 'cerialize';
import { Operator } from '@core/models/operator';
import { GovernmentProgram } from '@core/models/government-program';

export class LocationFeature {
  @autoserializeAs(Operator, 'operator')
  private readonly _operator: Operator;

  @autoserializeAs('quality')
  private readonly _quality: Quality;

  @autoserializeAs('active')
  private readonly _active: boolean;

  @autoserializeAs('archive')
  private readonly _archive: boolean;

  @autoserializeAs('planYear')
  private readonly _planYear: boolean;

  @autoserializeAs('planTwoYear')
  private readonly _planTwoYear: boolean;

  @autoserializeAs(GovernmentProgram, 'government_program')
  private readonly _governmentProgram: GovernmentProgram;


  constructor(operator: Operator, quality: Quality, active: boolean, archive: boolean, planYear: boolean, planTwoYear: boolean) {
    this._operator = operator;
    this._quality = quality;
    this._active = active;
    this._archive = archive;
    this._planYear = planYear;
    this._planTwoYear = planTwoYear;
  }

  get operator(): Operator {
    return this._operator;
  }

  get quality(): Quality {
    return this._quality;
  }

  get active(): boolean {
    return this._active;
  }

  get archive(): boolean {
    return this._archive;
  }

  get planYear(): boolean {
    return this._planYear;
  }

  get planTwoYear(): boolean {
    return this._planTwoYear;
  }

  get governmentProgram(): GovernmentProgram {
    return this._governmentProgram;
  }
}

