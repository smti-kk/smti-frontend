import {Point} from './Point';

export interface PointsConverter<T> {
  convert(point: T): Point;
}
