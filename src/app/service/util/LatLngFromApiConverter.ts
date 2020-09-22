import {IpInfo} from '@api/dto/IpInfo';
import {LatLng} from 'leaflet';

export abstract class LatLngFromApiConverter {
  abstract convert(api: IpInfo): LatLng;
}

