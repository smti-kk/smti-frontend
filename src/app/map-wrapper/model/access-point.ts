import { Coordinate } from '../interface/coordinate';

export abstract class AccessPoint {

  private _point: Coordinate;
  private readonly _name: string;
  private readonly _area: string;
  private _id;

  public constructor(_id: number,
                     _point: Coordinate,
                     _name: string,
                     _area: string) {
    this._id = _id;
    this._point = _point;
    this._name = _name;
    this._area = _area;
  }

  get id() {
    return this._id;
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
