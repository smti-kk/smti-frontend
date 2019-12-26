import {Map} from 'leaflet';
/*
  Без таких импортов работать не будет
  import 'leaflet-spin/example/spin/dist/spin';
  import 'leaflet-spin';
*/

declare module 'leaflet' {
  interface Map {
    spin(value: boolean): void;
  }
}
