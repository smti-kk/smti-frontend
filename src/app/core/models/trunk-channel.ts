import {autoserializeAs} from 'cerialize';

export const TRUNK_CHANNEL_DESERIALIZER = {
  Deserialize(obj: {id: number; name: string}): TrunkChannel {
    switch (obj.id) {
      case TrunkChannel.RADIO_CHANEL.type:
        return TrunkChannel.RADIO_CHANEL;
      case TrunkChannel.COPPER_CABLE.type:
        return TrunkChannel.COPPER_CABLE;
      case TrunkChannel.SATELLITE.type:
        return TrunkChannel.SATELLITE;
      case TrunkChannel.VOLS.type:
        return TrunkChannel.VOLS;
      case TrunkChannel.UNDEFINED.type:
        return TrunkChannel.UNDEFINED;
    }
  },
};

export class TrunkChannel {
  public static VOLS = new TrunkChannel(3, 'ВОЛС');
  public static SATELLITE = new TrunkChannel(4, 'Спутник');
  public static COPPER_CABLE = new TrunkChannel(5, 'Медь');
  public static RADIO_CHANEL = new TrunkChannel(6, 'Радио');
  public static UNDEFINED = new TrunkChannel(1, 'Неопределенно');

  @autoserializeAs('id')
  private readonly _type: number;

  @autoserializeAs('name')
  private readonly _name: string;

  constructor(type: number, name: string) {
    this._type = type;
    this._name = name;
  }

  get type(): number {
    return this._type;
  }

  get name(): string {
    return this._name;
  }

  get slug(): string {
    switch (this.type) {
      case TrunkChannel.COPPER_CABLE.type:
        return 'med';
      case TrunkChannel.RADIO_CHANEL.type:
        return 'radio';
      case TrunkChannel.SATELLITE.type:
        return 'sputnik';
      case TrunkChannel.VOLS.type:
        return 'vols';
    }
  }
}
