import { autoserializeAs } from 'cerialize';
import { TrunkChannelType } from '@core/models/enums';

export class TrunkChannel {
  @autoserializeAs('id')
  private readonly _type: TrunkChannelType;

  @autoserializeAs('name')
  private readonly _name: string;

  constructor(type: TrunkChannelType, name: string) {
    this._type = type;
    this._name = name;
  }

  get type(): TrunkChannelType {
    return this._type;
  }

  get name(): string {
    return this._name;
  }

  get slug(): string {
    switch (this.type) {
      case TrunkChannelType.COPPER_CABLE:
        return 'med';
      case TrunkChannelType.RADIO_CHANEl:
        return 'radio';
      case TrunkChannelType.SATELLITE:
        return 'sputnik';
      case TrunkChannelType.VOLS:
        return 'vols';
    }
  }
}

