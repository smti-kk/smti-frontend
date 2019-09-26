import Coordinate from '../access-points/interface/coordinate';

interface LocationSummaryCapabilityProperties {
  name: string;
  type: number;
}

export default class LocationSummaryCapability {
  constructor(private _administrativeCenter: string,
              private _area: number,
              private _ats: any,
              private _district: string,
              private _geometry: Coordinate,
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
              private _type: string) {}


  get administrativeCenter(): string {
    return this._administrativeCenter;
  }

  set administrativeCenter(value: string) {
    this._administrativeCenter = value;
  }

  get area(): number {
    return this._area;
  }

  set area(value: number) {
    this._area = value;
  }

  get ats(): any {
    return this._ats;
  }

  set ats(value: any) {
    this._ats = value;
  }

  get district(): string {
    return this._district;
  }

  set district(value: string) {
    this._district = value;
  }

  get geometry(): Coordinate {
    return this._geometry;
  }

  set geometry(value: Coordinate) {
    this._geometry = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get informat(): number {
    return this._informat;
  }

  set informat(value: number) {
    this._informat = value;
  }

  get internet(): any {
    return this._internet;
  }

  set internet(value: any) {
    this._internet = value;
  }

  get locality(): string {
    return this._locality;
  }

  set locality(value: string) {
    this._locality = value;
  }

  get mark(): number {
    return this._mark;
  }

  set mark(value: number) {
    this._mark = value;
  }

  get mobile(): any {
    return this._mobile;
  }

  set mobile(value: any) {
    this._mobile = value;
  }

  get okato(): string {
    return this._okato;
  }

  set okato(value: string) {
    this._okato = value;
  }

  get peopleCount(): number {
    return this._peopleCount;
  }

  set peopleCount(value: number) {
    this._peopleCount = value;
  }

  get petitions(): [] {
    return this._petitions;
  }

  set petitions(value: []) {
    this._petitions = value;
  }

  get projectDownAnalog(): any {
    return this._projectDownAnalog;
  }

  set projectDownAnalog(value: any) {
    this._projectDownAnalog = value;
  }

  get properties(): LocationSummaryCapabilityProperties {
    return this._properties;
  }

  set properties(value: LocationSummaryCapabilityProperties) {
    this._properties = value;
  }

  get radio(): any {
    return this._radio;
  }

  set radio(value: any) {
    this._radio = value;
  }

  get tv(): any {
    return this._tv;
  }

  set tv(value: any) {
    this._tv = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  static createFromApiModel(apiModel): LocationSummaryCapability {
    return new LocationSummaryCapability(
      apiModel.administrative_center,
      apiModel.area,
      apiModel.ats,
      apiModel.district,
      {
        lat: apiModel.geometry.coordinates[1],
        lng: apiModel.geometry.coordinates[0]
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
        name: apiModel.properties.name,
        type: apiModel.properties.type
      },
      apiModel.radio,
      apiModel.tv,
      apiModel.type
    );
  }
}
