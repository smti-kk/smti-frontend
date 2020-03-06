import {autoserializeAs} from 'cerialize';

import {Organization} from '@core/models/organization';

export class Location {
  @autoserializeAs('id')
  private readonly _id: number;

  @autoserializeAs('name')
  private readonly _name: string;

  @autoserializeAs('type_location')
  private readonly _typeLocation: string;

  @autoserializeAs('people_count')
  private readonly _peopleCount: number;

  @autoserializeAs(Location, 'parent')
  private readonly _municipalityArea: Location;

  @autoserializeAs(String, 'parent')
  private readonly _municipalityAreaStr: string;

  @autoserializeAs('infomat')
  private readonly _infomat: number;

  @autoserializeAs(Organization, 'organizations')
  private readonly _organizations: Organization[];

  constructor(
    id: number,
    name: string,
    typeLocation: string,
    peopleCount: number,
    municipalityArea: Location,
    infomat: number,
    organizations: Organization[]
  ) {
    this._id = id;
    this._name = name;
    this._typeLocation = typeLocation;
    this._peopleCount = peopleCount;
    this._municipalityArea = municipalityArea;
    this._infomat = infomat;
    this._organizations = organizations;
  }

  get organizations(): Organization[] {
    return this._organizations;
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
    if (this._municipalityArea && this._municipalityArea instanceof Location) {
      return this._municipalityArea.fullName;
    }
    if (this._municipalityAreaStr) {
      return this._municipalityAreaStr;
    }
    return '';
  }

  get infomat(): number {
    return this._infomat;
  }

  get fullName(): string {
    return `${this.typeLocation} ${this.name}`;
  }

  // noinspection JSUnusedGlobalSymbols
  get contractCount(): number {
    return this.organizations
      .map(organization => organization.contracts.length)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }

  // noinspection JSUnusedGlobalSymbols
  get connectionPointsCount(): number {
    return this.organizations
      .map(organization => organization.reaccesspoints.length)
      .reduce((a, b) => a + b, 0);
  }
}
