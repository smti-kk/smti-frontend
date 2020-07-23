import {autoserializeAs} from 'cerialize';

export class MobileGeneration {
  public static _2G = new MobileGeneration(1, '2G');

  public static _3G = new MobileGeneration(2, '3G');

  public static _4G = new MobileGeneration(3, '4G');

  public static _5G = new MobileGeneration(4, '5G');

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
}

export const MOBILE_GENERATION_DESERIALIZER = {
  Deserialize(obj: {id: number}): MobileGeneration {
    switch (obj.id) {
      case MobileGeneration._2G.type:
        return MobileGeneration._2G;
      case MobileGeneration._3G.type:
        return MobileGeneration._3G;
      case MobileGeneration._4G.type:
        return MobileGeneration._4G;
      case MobileGeneration._5G.type:
        return MobileGeneration._5G;
      default:
        throw Error(`Unknown mobile generation: ${obj}`);
    }
  },
};
