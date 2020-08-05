import {GeoPoint} from './GeoData';

export interface AccessPointFromApi {
  id: number;
  point: GeoPoint;
  state: boolean;
}
