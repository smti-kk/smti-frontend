import {Map} from 'leaflet';

declare module 'leaflet' {
  interface Map {
    spin(value: boolean): void;
  }
}
