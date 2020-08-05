import {GeoData} from '@api/dto/GeoData';

export interface MapLocation {
  name: string;
  type: string;
  id: number;
  parent: {
    id: number,
    name: string,
    type: string
  };
  geoData: GeoData;
}
