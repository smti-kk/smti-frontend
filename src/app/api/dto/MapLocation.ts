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
  id: number;
  location: {
    fias:string;
    geoData: {
      geoId: number,
      administrativeCenter: {
        lng: number;
        lat: number;
      }
    }
    locationId: number;
    name: string;
    okato: string;
    oktmo: string;
    parent: {
      parentId: number;
      parentLevel: number;
      parentName: string;
      parentType: string;
    };
    population: number;
    type: string
  };
  qualities: string;
}
