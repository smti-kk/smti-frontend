import { Coordinate } from '../interface/coordinate';

export abstract class MonitoringPoint {

  private _point: Coordinate;
  private readonly _name: string;
  private _id;

  public constructor(_id: number,
                     _point: Coordinate,
                     _name: string) {
    this._id = _id;
    this._point = _point;
    this._name = _name;
  }

  get id() {
    return this._id;
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
