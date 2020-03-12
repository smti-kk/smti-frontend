import {deserializeAs, inheritSerialization, serializeAs} from 'cerialize';

import {TRUNK_CHANNEL_DESERIALIZER, TrunkChannel} from '@core/models/trunk-channel';
import {Operator} from '@core/models/operator';
import {Quality} from '@core/models/enums';
import {LocationFeature} from '@core/models/location-feature';
import {GovernmentProgram} from '@core/models/government-program';
import {TYPE_SERIALIZER} from '@core/utils/serializers';

@inheritSerialization(LocationFeature)
export class InternetFeature extends LocationFeature {
  @deserializeAs(TRUNK_CHANNEL_DESERIALIZER, 'type_trunkchannel')
  @serializeAs(TYPE_SERIALIZER, 'type_trunkchannel')
  private readonly _channel: TrunkChannel;

  constructor(
    operator: Operator,
    quality: Quality,
    active: boolean,
    archive: boolean,
    completed: number,
    planYear: boolean,
    planTwoYear: boolean,
    governmentProgram: GovernmentProgram,
    channel: TrunkChannel
  ) {
    super(operator, quality, active, archive, completed, planYear, planTwoYear, governmentProgram);
    this._channel = channel;
  }

  get channel(): TrunkChannel {
    return this._channel;
  }
}
