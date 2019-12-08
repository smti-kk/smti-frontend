import { deserializeAs, inheritSerialization, serializeAs } from 'cerialize';
import { TRUNK_CHANNEL_DESERIALIZER, TrunkChannel } from '@core/models/trunk-channel';
import { Operator } from '@core/models/operator';
import { Quality } from '@core/models/enums';
import { LocationFeature } from '@core/models/location-feature';

@inheritSerialization(LocationFeature)
export class InternetFeature extends LocationFeature {

  @deserializeAs(TRUNK_CHANNEL_DESERIALIZER, 'type_trunkchannel')
  @serializeAs(TrunkChannel, 'type_trunkchannel')
  private readonly _channel: TrunkChannel;


  constructor(operator: Operator, quality: Quality, active: boolean,
              archive: boolean, planYear: boolean, planTwoYear: boolean, channel: TrunkChannel) {
    super(operator, quality, active, archive, planYear, planTwoYear);
    this._channel = channel;
  }

  get channel(): TrunkChannel {
    return this._channel;
  }
}
