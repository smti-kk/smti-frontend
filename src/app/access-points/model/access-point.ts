import Coordinate from '../interface/coordinate';

export default class AccessPoint {
  protected constructor(private _pk: number,
                        private _point: Coordinate) {
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
}
