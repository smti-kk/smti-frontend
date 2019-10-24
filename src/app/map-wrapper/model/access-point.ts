import { Coordinate } from '../interface/coordinate';

export abstract class AccessPoint {

  private _pk: number;
  private _point: Coordinate;
  private _name: string;
  private _area: string;

  protected constructor(_pk: number,
                        _point: Coordinate,
                        _name: string,
                        _area: string) {

    this._pk = _pk;
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

  get pk(): number {
    return this._pk;
  }

  set pk(value: number) {
    this._pk = value;
  }

  get point(): Coordinate {
    return this._point;
  }

  set point(value: Coordinate) {
    this._point = value;
  }

  abstract get iconUrl();
}
