import {PointState} from '../points/PointState';
import {Icon} from 'leaflet';

export interface IconFromState {
  icon(state: PointState): Icon;
}
