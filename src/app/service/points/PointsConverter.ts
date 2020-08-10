import {MonitoringPoint} from './MonitoringPoint';

export interface PointsConverter<T> {
  convert(point: T): MonitoringPoint;
}
