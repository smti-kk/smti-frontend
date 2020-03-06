import {autoserializeAs} from 'cerialize';

export class Signal {
  public static ATV = new Signal(1, 'Аналоговое');

  public static CTV = new Signal(2, 'Цифровое');

  @autoserializeAs('id')
  private readonly _id: number;

  @autoserializeAs('name')
  private readonly _name: string;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get shortName(): string {
    if (this.id === Signal.ATV.id) {
      return 'АТВ';
    }
    if (this.id === Signal.CTV.id) {
      return 'ЦТВ';
    }
    throw Error(`Unknown signal: ${this}`);
  }
}

// noinspection JSUnusedGlobalSymbols
export const SIGNAL_ARRAY_SERIALIZER = {
  Deserialize(objs: {id: number}[]): Signal {
    if (!objs || !objs[0]) {
      return null;
    }
    switch (objs[0].id) {
      case Signal.ATV.id:
        return Signal.ATV;
      case Signal.CTV.id:
        return Signal.CTV;
      default:
        throw Error(`Unknown SIGNAL: ${objs[0]}`);
    }
  },
  Serialize(signal: Signal): number[] {
    return signal ? [signal.id] : null;
  },
};
