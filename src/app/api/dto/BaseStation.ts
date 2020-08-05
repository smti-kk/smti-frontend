import {Operator} from './Operator';
import {MobileType} from './MobileType';
import {GeoData, GeoPoint} from './GeoData';

export interface BaseStation {
  id: number;
  address: string;
  propHeight: number;
  actionDate: string;
  operator: Operator;
  mobileType: MobileType;
  coverageRadius: number;
  point: GeoPoint;
}
