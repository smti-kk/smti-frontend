import {GeoData} from '@api/dto/GeoData';
import { Quality } from '@api/dto/Quality';

export interface MapLocation {
  name: string;
  type: string;
  id: number;
  complexName?: string,
  qualities?: Quality[];
  parent: {
    id: number,
    name: string,
    type: string
  };
  geoData: GeoData;
}

export interface MapLocationWithQuality {
  location: MapLocation;
  qualities: Quality[];
}
