import { Coordinate } from '../interface/coordinate';
import { BaseModel } from '../../shared/models/base-model';

export abstract class AccessPoint extends BaseModel {

  private _point: Coordinate;
  private _name: string;
  private _area: string;

  public constructor(_id: number,
                     _point: Coordinate,
                     _name: string,
                     _area: string) {
    super(_id);
    this._point = _point;
    this._name = _name;
    this._area = _area;
  }


  get area(): string {
    return this._area;
  }

  get name(): string {
    return this._name;
  }

  get point(): Coordinate {
    return this._point;
  }

  set point(value: Coordinate) {
    this._point = value;
  }

  abstract get iconUrl();
}
