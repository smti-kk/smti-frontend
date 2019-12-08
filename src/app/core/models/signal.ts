import { autoserializeAs } from 'cerialize';

export const SIGNAL_ARRAY_DESERIALIZER = {
  Deserialize(objs: { id: number }[]): Signal[] {
    return objs.map(obj => {
      switch (obj.id) {
        case Signal.ATV.id:
          return Signal.ATV;
        case Signal.CTV.id:
          return Signal.CTV;
      }
    });
  }
};

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

  get shortName() {
    if (this.id === Signal.ATV.id) {
      return 'АТВ';
    } else if (this.id === Signal.CTV.id) {
      return 'ЦТВ';
    }
  }
}
