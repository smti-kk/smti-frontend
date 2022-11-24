import { PointsConverter } from '../points/PointsConverter';
import { MapLocation } from '@api/dto/MapLocation';
import { MonitoringPoint } from '../points/MonitoringPoint';
import { Icon } from 'leaflet';

type LocationPointsConverterOptions = {
  pointsColor?: string;
};
export class LocationPointsConverter implements PointsConverter<MapLocation> {
  private readonly ICON_DEFAULT_URL = '../../assets/p-location.svg';
  private readonly ICON_RED_URL = '../../assets/p-location_red.svg';
  private readonly ICON_GREEN_URL = '../../assets/p-location_green.svg';
  private readonly ICON_SHADOW_URL = '../../assets/p-shadow.png';
  private readonly pointsColor: string = 'default';

  constructor(options?: LocationPointsConverterOptions) {
    if (options?.pointsColor) {
      this.pointsColor = options.pointsColor;
    }
  }

  convert(location: MapLocation): MonitoringPoint {
    let ICON_DEFAULT_URL;
    let ICON_URL;
    let colorName;
    switch (this.pointsColor) {
      case 'red':
        ICON_DEFAULT_URL = this.ICON_RED_URL;
        break;
      case 'green':
        ICON_DEFAULT_URL = this.ICON_GREEN_URL;
        break;
      default:
        ICON_DEFAULT_URL = this.ICON_DEFAULT_URL;
        break;
    }
    const qualities = location?.qualities ?? [];
    let quality = '';
    if (qualities.length > 0) {
      quality = qualities.every((q) => q === 'GOOD')
        ? 'GOOD'
        : qualities.every((q) => q === 'ABSENT')
        ? 'ABSENT'
        : 'NORMAL';
    } else {
      quality = 'ABSENT';
    }
    switch (quality) {
      case 'GOOD':
        ICON_URL = this.ICON_GREEN_URL;
        colorName = 'green';
        break;
      case 'NORMAL':
        ICON_URL = this.ICON_GREEN_URL;
        colorName = 'green';
        break;
      case 'ABSENT':
        ICON_URL = this.ICON_RED_URL;
        colorName = 'red';
        break;
      default:
        ICON_URL = ICON_DEFAULT_URL;
        colorName = this.pointsColor;
        break;
    }

    return new MonitoringPoint(
      location.id,
      location.geoData.administrativeCenter,
      {
        icon: new Icon({
          iconUrl: ICON_URL,
          iconSize: [30, 41],
          iconAnchor: [15, 41],
          shadowUrl: this.ICON_SHADOW_URL,
          shadowSize: [30, 41],
          shadowAnchor: [15, 9],
          className: `marker_${colorName}`,
        }),
      },
      location
    );
  }
}
