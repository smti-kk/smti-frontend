import { Coordinate } from '../interface/coordinate';
import { AccessPoint } from './access-point';

const SMO_MARKER_PATH = '../../../../assets/img/Ресурс 6.svg';

export class AccessPointSmo extends AccessPoint {

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

  get address(): string {
    return this._address;
  }

  get cmoType(): string {
    return this._cmoType;
  }

  get definedSpeed(): string {
    return this._definedSpeed;
  }

  get description(): string {
    return this._description;
  }

  get institutionType(): string {
    return this._institutionType;
  }

  get label(): string {
    return this._label;
  }

  get mediumType(): string {
    return this._mediumType;
  }

  get networkProvider(): string {
    return this._networkProvider;
  }

  get orgName(): string {
    return this._orgName;
  }

  get visible(): boolean {
    return this._visible;
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
