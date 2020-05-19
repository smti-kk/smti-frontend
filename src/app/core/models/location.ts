import {autoserializeAs} from 'cerialize';

import {Organization} from '@core/models/organization';

export class Location {
  @autoserializeAs('id')
  private readonly _id: number;

  @autoserializeAs('parent')
  private readonly _parent: Location;

  @autoserializeAs('fullName')
  private readonly _fullName: string;

  @autoserializeAs('name')
  private readonly _name: string;

  @autoserializeAs('type')
  private readonly _type: string;

  @autoserializeAs('population')
  private readonly _population: number;

  // @autoserializeAs('type_location')
  // private readonly _typeLocation: string;
  //
  // @autoserializeAs('people_count')
  // private readonly _peopleCount: number;

  // @autoserializeAs(Location, 'parent')
  // private readonly _municipalityArea: Location;


  constructor(
    id: number,
    parent: Location,
    fullName: string,
    name: string,
    type: string,
    population: number,
    // typeLocation: string,
    // peopleCount: number,
    // municipalityArea: Location,
    // infomat: number,
    // organizations: Organization[]
  ) {
    this._id = id;
    this._parent = parent,
    this._fullName = fullName;
    this._name = name;
    this._type = type;
    this._population = population;
    // this._typeLocation = typeLocation;
    // this._peopleCount = peopleCount;
    // this._municipalityArea = municipalityArea;
    // this._infomat = infomat;
    // this._organizations = organizations;
  }

  // get organizations(): Organization[] {
  //   return this._organizations;
  // }

  // get parent(): Location {
  //   return this._municipalityArea;
  // }

  get id(): number {
    return this._id;
  }

  get parent(): Location {
    return this._parent;
  }

  get fullName(): string {
    return this._fullName;
  }

  get name(): string {
    return this._name;
  }

  get type(): string {
    return this._type;
  }

  get population(): number {
    return this._population;
  }

  // get typeLocation(): string {
  //   return this._typeLocation;
  // }

  // get peopleCount(): number {
  //   return this._peopleCount;
  // }

  // get municipalityArea(): string {
  //   if (this._municipalityArea && this._municipalityArea instanceof Location) {
  //     return this._municipalityArea.fullName;
  //   }
  //   if (this._municipalityAreaStr) {
  //     return this._municipalityAreaStr;
  //   }
  //   return '';
  // }

  // get infomat(): number {
  //   return this._infomat;
  // }

  // get fullName(): string {
  //   return `${this.typeLocation} ${this.name}`;
  // }

  // noinspection JSUnusedGlobalSymbols
  // get contractCount(): number {
  //   return this.organizations
  //     .map(organization => organization.contracts.length)
  //     .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  // }

  // noinspection JSUnusedGlobalSymbols
  // get connectionPointsCount(): number {
  //   return this.organizations
  //     .map(organization => organization.reaccesspoints.length)
  //     .reduce((a, b) => a + b, 0);
  // }
}
