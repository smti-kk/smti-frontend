import {Point} from './Point';

export abstract class PointUniquenessFilter {
  abstract filter(points: Point[]): Point[];
}

