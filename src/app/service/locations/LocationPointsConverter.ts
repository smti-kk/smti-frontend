import {PointsConverter} from '../points/PointsConverter';
import {MapLocation} from '@api/dto/MapLocation';
import {MonitoringPoint} from '../points/MonitoringPoint';
import {Icon} from 'leaflet';

export class LocationPointsConverter implements PointsConverter<MapLocation> {
  private readonly ICON_URL = '../../assets/p-location.svg';
  private readonly ICON_SHADOW_URL = '../../assets/p-shadow.png';

  convert(location: MapLocation): MonitoringPoint {
    return new MonitoringPoint(
      location.id,
      location.geoData.administrativeCenter,
      {
        icon: new Icon({
          iconUrl: this.ICON_URL,
          iconSize: [30, 41],
          iconAnchor: [15, 41],
          shadowUrl:this.ICON_SHADOW_URL,
          shadowSize: [30, 41],
          shadowAnchor:[15, 9]
        })
      }
    );
  }
}
