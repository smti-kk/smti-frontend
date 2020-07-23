import {GeoData} from './GeoData';

export interface AccessPointFromApi {
  id: number;
  point: GeoData;
  state: boolean;
}
