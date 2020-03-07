import {autoserializeAs, inheritSerialization} from 'cerialize';
import {LocationFeature} from '@core/models/location-feature';
import {Signal, SIGNAL_ARRAY_SERIALIZER} from '@core/models/signal';

@inheritSerialization(LocationFeature)
export class TelevisionFeature extends LocationFeature {
  @autoserializeAs(SIGNAL_ARRAY_SERIALIZER, 'type')
  private readonly _type: Signal; // todo signal is array Signal[]

  get type(): Signal {
    return this._type;
  }

  get typeStr(): string {
    return this.type.shortName;
  }
}
