import { Icon, Marker } from 'leaflet';
import * as geojson from 'geojson';
import { AccessPoint } from '../model/access-point';
import { EventEmitter } from '@angular/core';

const ICON_WIDTH = 30;
const ICON_HEIGHT = 41;
const ICON_ANCHOR_LEFT = 12;
const ICON_ANCHOR_TOP = 41;
const SHADOW_ANCHOR_LEFT = 4;
const SHADOW_ANCHOR_TOP = 62;
const POPUP_ANCHOR_LEFT = 8;
const POPUP_ANCHOR_TOP = -25;

const BIG_ICON_WIDTH = 38;
const BIG_ICON_HEIGHT = 48;


export class AccessPointMarker<T extends AccessPoint> extends Marker {

  private static deactivateMarker: EventEmitter<void> = new EventEmitter<void>();

  feature: geojson.Feature<geojson.Point, T>;

  constructor(point: T) {
    super(
      [point.point.lat, point.point.lng],
      {
        icon: AccessPointMarker.createIcon(point)
      }
    );

    this.feature = {
      id: point.id,
      properties: point,
      type: 'Feature',
      geometry: null
    };

    this.on('click', () => {
      AccessPointMarker.deactivateMarker.emit();

      this.setIcon(AccessPointMarker.createBigIcon(this.feature.properties));

      const observer = AccessPointMarker.deactivateMarker.subscribe(() => {
        observer.unsubscribe();
        this.setIcon(AccessPointMarker.createIcon(this.feature.properties));
      });
    });
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

    if (this.feature.properties.iconUrl !== point.iconUrl) {
      this.setIcon(AccessPointMarker.createIcon(point));
    }

    this.feature.properties = point;
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

  private static createBigIcon(point: AccessPoint): Icon {
    return new Icon({
      iconUrl: point.iconUrl,
      iconSize: [BIG_ICON_WIDTH, BIG_ICON_HEIGHT],
      iconAnchor: [ICON_ANCHOR_LEFT, ICON_ANCHOR_TOP],
      shadowAnchor: [SHADOW_ANCHOR_LEFT, SHADOW_ANCHOR_TOP],
      popupAnchor: [POPUP_ANCHOR_LEFT, POPUP_ANCHOR_TOP],
    });
  }
}
