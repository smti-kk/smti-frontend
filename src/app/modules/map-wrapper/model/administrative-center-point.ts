import { MonitoringPoint } from './monitoring-point';
import { Coordinate } from '@map-wrapper/interface/coordinate';

const MARKER_ICON_DEFAULT = '../../../../assets/img/Ресурс 8.svg';

export class AdministrativeCenterPoint extends MonitoringPoint {
  private _area: string;

  public constructor(_id: number,
                     _point: Coordinate,
                     _name: string,
                     _area: string) {
    super(_id, _point, _name);
    this._area = _area;
  }

  get iconUrl() {
    return MARKER_ICON_DEFAULT;
  }

  get area(): string {
    return this._area;
  }
}
