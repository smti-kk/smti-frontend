import {MonitoringPoint} from './MonitoringPoint';
import {LatLngExpression, MarkerOptions} from 'leaflet';
import {PointState} from './PointState';

export class PointWithState extends MonitoringPoint {
  private readonly state: PointState;

  constructor(id: number,
              state: PointState,
              latLng: LatLngExpression,
              options: MarkerOptions) {
    super(id, latLng, options);
    this.state = state;
  }

  getState(): PointState {
    return this.state;
  }
}
