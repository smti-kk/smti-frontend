import { Point } from 'geojson';

interface LocationSummaryCapabilityProperties {
  name: string;
  type: number;
}

export default class LocationSummaryCapability {

  constructor(private _administrativeCenter: Point,
              private _area: number,
              private _ats: any,
              private _district: string,
              private _geometry: {lat: number, lng: number},
              private _id: number,
              private _informat: number,
              private _internet: any,
              private _locality: string,
              private _mark: number,
              private _mobile: any,
              private _okato: string,
              private _peopleCount: number,
              private _petitions: [],
              private _projectDownAnalog: any,
              private _properties: LocationSummaryCapabilityProperties,
              private _radio: any,
              private _tv: any,
              private _type: string) {
  }


  get id(): number {
    return this._id;
  }

  get administrativeCenter(): Point {
    return this._administrativeCenter;
  }

  get area(): number {
    return this._area;
  }

  get ats(): any {
    return this._ats;
  }

  get district(): string {
    return this._district;
  }

  get geometry(): {lat: number, lng: number} {
    return this._geometry;
  }

  get informat(): number {
    return this._informat;
  }

  get internet(): any {
    return this._internet;
  }

  get locality(): string {
    return this._locality;
  }

  get mark(): number {
    return this._mark;
  }

  get mobile(): any {
    return this._mobile;
  }

  get okato(): string {
    return this._okato;
  }

  get peopleCount(): number {
    return this._peopleCount;
  }

  get petitions(): [] {
    return this._petitions;
  }

  get projectDownAnalog(): any {
    return this._projectDownAnalog;
  }

  get properties(): LocationSummaryCapabilityProperties {
    return this._properties;
  }

  get radio(): any {
    return this._radio;
  }

  get tv(): any {
    return this._tv;
  }

  get type(): string {
    return this._type;
  }

  static createFromApiModel(apiModel): LocationSummaryCapability {
    return new LocationSummaryCapability(
      apiModel.administrative_center ? JSON.parse(apiModel.administrative_center) : null,
      apiModel.area,
      apiModel.ats,
      apiModel.district,
      {
        lat: apiModel.geometry ? apiModel.geometry.coordinates[1] : null,
        lng: apiModel.geometry ? apiModel.geometry.coordinates[0] : null
      },
      apiModel.id,
      apiModel.informat,
      apiModel.internet,
      apiModel.locality,
      apiModel.mark,
      apiModel.mobile,
      apiModel.okato,
      apiModel.people_count,
      apiModel.petitions,
      apiModel.project_down_analog,
      {
        name: apiModel.properties ? apiModel.properties.name : null,
        type: apiModel.properties ? apiModel.properties.type : null
      },
      apiModel.radio,
      apiModel.tv,
      apiModel.type
    );
  }
}
