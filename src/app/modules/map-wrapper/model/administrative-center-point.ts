import {autoserializeAs, inheritSerialization} from 'cerialize';

import {Coordinate} from '@map-wrapper/interface/coordinate';

import {MonitoringPoint} from './monitoring-point';

@inheritSerialization(MonitoringPoint)
export class AdministrativeCenterPoint extends MonitoringPoint {
  private readonly MARKER_ICON_DEFAULT = '../../../../assets/img/p-location.svg';

  @autoserializeAs('district')
  private readonly _district: string;

  @autoserializeAs('full_name')
  private readonly _fullName: string;

  constructor(point: Coordinate, id: number, district: string, fullName: string) {
    super(point, id);
    this._district = district;
    this._fullName = fullName;
  }

  get fullName(): string {
    return this._fullName;
  }

  get iconUrl(): string {
    return this.MARKER_ICON_DEFAULT;
  }

  get district(): string {
    return this._district;
  }
}
