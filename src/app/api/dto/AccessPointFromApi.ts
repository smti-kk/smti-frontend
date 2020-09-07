import {GeoPoint} from './GeoData';
import {PointState} from '@service/points/PointState';

export interface AccessPointFromApi {
  id: number;
  point: GeoPoint;
  connectionState: PointState;
}
