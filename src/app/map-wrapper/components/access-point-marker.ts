import {Icon, Marker} from 'leaflet';
import * as geojson from 'geojson';
import AccessPoint from '@map-wrapper/model/access-point';

interface AccessPointMarkerProperties<T extends AccessPoint> {
  point: T;
}

export class AccessPointMarker<T extends AccessPoint> extends Marker {

  feature: geojson.Feature<geojson.Point, AccessPointMarkerProperties<T>>;

  constructor(point: T, iconUrl: string) {
    super(
      [point.point.lat, point.point.lng],
      {icon: AccessPointMarker.createIcon(iconUrl)}
    );

    this.feature = {
      properties: {
        point
      },
      type: 'Feature',
      geometry: null
    };
  }

  public updateLatLng(lng: number, lat: number) {
    if (this.getLatLng().lng !== lng ||
      this.getLatLng().lat !== lat
    ) {
      this.setLatLng({lat, lng});
    }
  }

  private static createIcon(iconUrl): Icon {
    return new Icon({
      iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowAnchor: [4, 62],
      popupAnchor: [-1, -25],
    });
  }
}
