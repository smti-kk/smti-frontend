import {Point} from './Point';
import {PointUniquenessFilter} from './PointUniquenessFilter';

export class PointUniquenessFilterImpl implements PointUniquenessFilter {
  private readonly history: Map<number, Point>;

  constructor() {
    this.history = new Map<number, Point>();
  }

  filter(points: Point[]): Point[] {
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
