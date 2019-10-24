import { Icon, Marker } from 'leaflet';
import * as geojson from 'geojson';
import { AccessPoint } from '@map-wrapper/model/access-point';

const ICON_WIDTH = 30;
const ICON_HEIGHT = 41;
const ICON_ANCHOR_LEFT = 12;
const ICON_ANCHOR_TOP = 41;
const SHADOW_ANCHOR_LEFT = 4;
const SHADOW_ANCHOR_TOP = 62;
const POPUP_ANCHOR_LEFT = -1;
const POPUP_ANCHOR_TOP = -25;

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
      iconSize: [ICON_WIDTH, ICON_HEIGHT],
      iconAnchor: [ICON_ANCHOR_LEFT, ICON_ANCHOR_TOP],
      shadowAnchor: [SHADOW_ANCHOR_LEFT, SHADOW_ANCHOR_TOP],
      popupAnchor: [POPUP_ANCHOR_LEFT, POPUP_ANCHOR_TOP],
    });
  }
}
