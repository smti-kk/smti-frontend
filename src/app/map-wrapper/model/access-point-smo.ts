import Coordinate from '../interface/coordinate';
import AccessPoint from './access-point';

const SMO_MARKER_PATH = '../../../../assets/img/Ресурс 6.svg';

export default class AccessPointSmo extends AccessPoint {

  constructor(private _actualAddress: string,
              private _address: string,
              private _cmoType: string,
              private _definedSpeed: string,
              private _description: string,
              private _institutionType: string,
              private _label: string,
              private _mediumType: string,
              private _networkProvider: string,
              private _orgName: string,
              _pk: number,
              _point: Coordinate,
              private _visible: boolean) {
    super(_pk, _point, _orgName, '');
  }

  get iconUrl() {
    return SMO_MARKER_PATH;
  }


  get actualAddress(): string {
    return this._actualAddress;
  }

  set actualAddress(value: string) {
    this._actualAddress = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get cmoType(): string {
    return this._cmoType;
  }

  set cmoType(value: string) {
    this._cmoType = value;
  }

  get definedSpeed(): string {
    return this._definedSpeed;
  }

  set definedSpeed(value: string) {
    this._definedSpeed = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get institutionType(): string {
    return this._institutionType;
  }

  set institutionType(value: string) {
    this._institutionType = value;
  }

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  get mediumType(): string {
    return this._mediumType;
  }

  set mediumType(value: string) {
    this._mediumType = value;
  }

  get networkProvider(): string {
    return this._networkProvider;
  }

  set networkProvider(value: string) {
    this._networkProvider = value;
  }

  get orgName(): string {
    return this._orgName;
  }

  set orgName(value: string) {
    this._orgName = value;
  }

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
  }

  static createFromApiModel(apiModel): AccessPointSmo {
    return new AccessPointSmo(
      apiModel.actual_address,
      apiModel.address,
      apiModel.cmo_type,
      apiModel.defined_speed,
      apiModel.description,
      apiModel.institution_type,
      apiModel.label,
      apiModel.medium_type,
      apiModel.network_provider,
      apiModel.org_name,
      apiModel.pk,
      {
        lat: apiModel.point.coordinates[1],
        lng: apiModel.point.coordinates[0]
      },
      apiModel.visible
    );
  }
}
