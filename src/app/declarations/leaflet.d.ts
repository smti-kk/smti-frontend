import { Map } from 'leaflet';

/*
  Без таких импортов работать не будет
  import 'leaflet-spin/example/spin/dist/spin';
  import 'leaflet-spin';
*/

export declare class ExtendedMap extends Map {
  spin(value: boolean): void;
}
