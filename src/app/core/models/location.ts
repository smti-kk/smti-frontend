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
  private readonly _municipalityArea: string;

  @autoserializeAs('infomat')
  private readonly _infomat: number;

  @autoserializeAs(Location, 'parent')
  private readonly _parent: Location;


  constructor(id: number, name: string, typeLocation: string, peopleCount: number,
              municipalityArea: string, infomat: number, parent: Location) {
    this._id = id;
    this._name = name;
    this._typeLocation = typeLocation;
    this._peopleCount = peopleCount;
    this._municipalityArea = municipalityArea;
    this._infomat = infomat;
    this._parent = parent;
  }


  get parent(): Location {
    return this._parent;
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

  get municipalityArea(): string {
    return this._municipalityArea;
  }

  get infomat(): number {
    return this._infomat;
  }
}
