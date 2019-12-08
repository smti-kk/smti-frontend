import { LocationFeature } from '@core/models/location-feature';
import { deserializeAs, inheritSerialization, serializeAs } from 'cerialize';
import { Quality } from '@core/models/enums';
import { Operator } from '@core/models/operator';
import { Signal, SIGNAL_ARRAY_DESERIALIZER } from '@core/models/signal';

@inheritSerialization(LocationFeature)
export class TelevisionFeature extends LocationFeature {

  @serializeAs(Signal, 'type')
  @deserializeAs(SIGNAL_ARRAY_DESERIALIZER, 'type')
  private readonly _type: Signal[];

  constructor(operator: Operator, quality: Quality, active: boolean,
              archive: boolean, planYear: boolean, planTwoYear: boolean, type: Signal[]) {
    super(operator, quality, active, archive, planYear, planTwoYear);
    this._type = type;
  }

  get type(): Signal[] {
    return this._type;
  }

  get typeStr(): string {
    return this.type
      .map(type => type.shortName)
      .join(', ');
  }
}
