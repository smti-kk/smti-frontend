import {autoserializeAs, deserializeAs, serializeAs} from 'cerialize';
import {Quality} from '@core/models/enums';
import {Operator} from '@core/models/operator';
import {GovernmentProgram} from '@core/models/government-program';
import {ID_SERIALIZER} from '@core/utils/serializers';

export class LocationFeature {
  @autoserializeAs('id')
  private readonly _id: number;

  @deserializeAs(Operator, 'operator')
  @serializeAs(ID_SERIALIZER, 'operator')
  private readonly _operator: Operator;

  @autoserializeAs('quality')
  private readonly _quality: Quality;

  @autoserializeAs('active')
  private readonly _active: boolean;

  @autoserializeAs('archive')
  private readonly _archive: boolean;

  @autoserializeAs('completed')
  private readonly _completed: number;

  @autoserializeAs('planYear')
  private readonly _planYear: boolean;

  @autoserializeAs('planTwoYear')
  private readonly _planTwoYear: boolean;

  @deserializeAs(GovernmentProgram, 'government_program')
  @serializeAs(ID_SERIALIZER, 'government_program')
  private readonly _governmentProgram: GovernmentProgram;

  @autoserializeAs('commissioning')
  private readonly _commissioning: number;

  @autoserializeAs('requests')
  private readonly _requests: number;

  @autoserializeAs('technical_status')
  private readonly _technicalStatus: string;

  @autoserializeAs(LocationFeature, 'previous')
  private readonly _previous: LocationFeature;

  @autoserializeAs('dismiss_date')
  private readonly _dismissDate: string;

  @autoserializeAs('clarify_petition')
  private readonly _clarifyPetition: number;

  @autoserializeAs('functional_customer')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly _functionalCustomer: any; // todo: Установить тип

  constructor(
    operator: Operator,
    quality: Quality,
    active: boolean,
    archive: boolean,
    completed: number,
    planYear: boolean,
    planTwoYear: boolean,
    governmentProgram: GovernmentProgram
  ) {
    this._operator = operator;
    this._quality = quality;
    this._active = active;
    this._archive = archive;
    this._completed = completed;
    this._planYear = planYear;
    this._planTwoYear = planTwoYear;
    this._governmentProgram = governmentProgram;
  }

  get id(): number {
    return this._id;
  }

  get previous(): LocationFeature {
    return this._previous;
  }

  get requests(): number {
    return this._requests;
  }

  get commissioning(): number {
    return this._commissioning;
  }

  get completed(): number {
    return this._completed;
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
