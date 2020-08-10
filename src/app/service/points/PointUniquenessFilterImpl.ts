import {MonitoringPoint} from './MonitoringPoint';
import {PointUniquenessFilter} from './PointUniquenessFilter';

export class PointUniquenessFilterImpl implements PointUniquenessFilter {
  private readonly history: Map<number, MonitoringPoint>;

  constructor() {
    this.history = new Map<number, MonitoringPoint>();
  }

  filter(points: MonitoringPoint[]): MonitoringPoint[] {
    return points.filter(point => {
      if (!this.history.has(point.getId())) {
        this.history.set(point.getId(), point);
        return true;
      } else {
        return false;
      }
    });
  }
}
