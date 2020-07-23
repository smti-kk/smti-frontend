import {PointsConverter} from '../points/PointsConverter';
import {MapLocation} from '@api/dto/MapLocation';
import {Point} from '../points/Point';
import {Icon} from 'leaflet';

export class LocationPointsConverter implements PointsConverter<MapLocation> {
  private readonly ICON_URL = '../../assets/p-location.svg';

  convert(location: MapLocation): Point {
    return new Point(
      location.id,
      location.point,
      {
        icon: new Icon({iconUrl: this.ICON_URL, iconSize: [30, 41]})
      }
    );
  }
}
