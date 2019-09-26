import AccessPoint from './access-point';
import Coordinate from '../interface/coordinate';

export default class AccessPointEspd extends AccessPoint {

  constructor(_pk: number,
              _point: Coordinate,
              private _orgName: string,
              private _actualAddress: string,
              private _customer: string,
              private _contractor: string,
              private _mediumType: string,
              private _connection: string,
              private _definedSpeed: string,
              private _description: string) {
    super(_pk, _point);
  }


  get description(): string {
    return this._description;
  }

  get orgName(): string {
    return this._orgName;
  }

  get actualAddress(): string {
    return this._actualAddress;
  }

  get customer(): string {
    return this._customer;
  }

  get contractor(): string {
    return this._contractor;
  }

  get mediumType(): string {
    return this._mediumType;
  }

  get connection(): string {
    return this._connection;
  }

  get definedSpeed(): string {
    return this._definedSpeed;
  }

  static createFromApiModel(apiModel): AccessPointEspd {
    return new AccessPointEspd(
      apiModel.pk,
      {
        lat: apiModel.point.coordinates[1],
        lng: apiModel.point.coordinates[0]
      },
      apiModel.org_name,
      apiModel.actual_address,
      apiModel.network_provider,
      apiModel.medium_type,
      apiModel.defined_speed,
      apiModel.cmo_type,
      apiModel.institution_type,
      apiModel.description
    );
  }
}
