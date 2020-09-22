import {MonitoringPoint} from './MonitoringPoint';

export abstract class PointUniquenessFilter {
  abstract filter(points: MonitoringPoint[]): MonitoringPoint[];
}

