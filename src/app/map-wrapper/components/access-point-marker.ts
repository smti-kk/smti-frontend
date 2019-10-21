import { Icon, Marker } from 'leaflet';
import * as geojson from 'geojson';
import AccessPoint from '@map-wrapper/model/access-point';

interface AccessPointMarkerProperties<T extends AccessPoint> {
  point: T;
}

export class AccessPointMarker<T extends AccessPoint> extends Marker {

  feature: geojson.Feature<geojson.Point, AccessPointMarkerProperties<T>>;

  constructor(point: T) {
    super(
      [point.point.lat, point.point.lng],
      {
        icon: AccessPointMarker.createIcon(point)
      }
    );

    this.feature = {
      id: point.pk,
      properties: {
        point
      },
      type: 'Feature',
      geometry: null
    };
  }

  public updateData(point: T) {
    if (this.getLatLng().lng !== point.point.lng ||
      this.getLatLng().lat !== point.point.lat
    ) {
      this.setLatLng({
        lat: point.point.lat,
        lng: point.point.lng
      });
    }

    if (this.feature.properties.point.iconUrl !== point.iconUrl) {
      this.setIcon(AccessPointMarker.createIcon(point));
    }

    this.feature.properties.point = point;
  }

  private static createIcon(point: AccessPoint): Icon {
    return new Icon({
      iconUrl: point.iconUrl,
      iconSize: [30, 41],
      iconAnchor: [12, 41],
      shadowAnchor: [4, 62],
      popupAnchor: [-1, -25],
    });
  }
}
