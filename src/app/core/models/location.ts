import { autoserializeAs } from 'cerialize';

export class Location {
  @autoserializeAs('id')
  private readonly _id: number;

  @autoserializeAs('name')
  private readonly _name: string;

  @autoserializeAs('type_location')
  private readonly _typeLocation: string;

  @autoserializeAs('people_count')
  private readonly _peopleCount: number;

  @autoserializeAs('parent')
  private readonly _parent: string;

  @autoserializeAs('infomat')
  private readonly _infomat: number;


  constructor(id: number, name: string, typeLocation: string, peopleCount: number, parent: string, infomat: number) {
    this._id = id;
    this._name = name;
    this._typeLocation = typeLocation;
    this._peopleCount = peopleCount;
    this._parent = parent;
    this._infomat = infomat;
  }


  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get typeLocation(): string {
    return this._typeLocation;
  }

  get peopleCount(): number {
    return this._peopleCount;
  }

  get parent(): string {
    return this._parent;
  }

  get infomat(): number {
    return this._infomat;
  }
}
