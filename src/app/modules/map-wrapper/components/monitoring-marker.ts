import {Icon, Marker} from 'leaflet';
// eslint-disable-next-line import/no-unresolved
import * as geojson from 'geojson';
import {EventEmitter} from '@angular/core';

import {MonitoringPoint} from '../model/monitoring-point';

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

export class MonitoringMarker<T extends MonitoringPoint> extends Marker {
  private static deactivateMarker: EventEmitter<void> = new EventEmitter<void>();

  feature: geojson.Feature<geojson.Point, T>;

  constructor(point: T) {
    super([point.point.lat, point.point.lng], {
      icon: MonitoringMarker.createIcon(point),
    });

    this.feature = {
      id: point.id,
      properties: point,
      type: 'Feature',
      geometry: null,
    };

    this.on('click', () => {
      MonitoringMarker.deactivateMarker.emit();

      this.setIcon(MonitoringMarker.createBigIcon(this.feature.properties));

      const observer = MonitoringMarker.deactivateMarker.subscribe(() => {
        observer.unsubscribe();
        this.setIcon(MonitoringMarker.createIcon(this.feature.properties));
      });
    });
  }

  public updateData(point: T): void {
    if (this.getLatLng().lng !== point.point.lng || this.getLatLng().lat !== point.point.lat) {
      this.setLatLng({
        lat: point.point.lat,
        lng: point.point.lng,
      });
    }

    if (this.feature.properties.iconUrl !== point.iconUrl) {
      this.setIcon(MonitoringMarker.createIcon(point));
    }

    this.feature.properties = point;
  }

  private static createIcon(point: MonitoringPoint): Icon {
    return new Icon({
      iconUrl: point.iconUrl,
      iconSize: [ICON_WIDTH, ICON_HEIGHT],
      iconAnchor: [ICON_ANCHOR_LEFT, ICON_ANCHOR_TOP],
      shadowAnchor: [SHADOW_ANCHOR_LEFT, SHADOW_ANCHOR_TOP],
      popupAnchor: [POPUP_ANCHOR_LEFT, POPUP_ANCHOR_TOP],
    });
  }

  private static createBigIcon(point: MonitoringPoint): Icon {
    return new Icon({
      iconUrl: point.iconUrl,
      iconSize: [BIG_ICON_WIDTH, BIG_ICON_HEIGHT],
      iconAnchor: [ICON_ANCHOR_LEFT, ICON_ANCHOR_TOP],
      shadowAnchor: [SHADOW_ANCHOR_LEFT, SHADOW_ANCHOR_TOP],
      popupAnchor: [POPUP_ANCHOR_LEFT, POPUP_ANCHOR_TOP],
    });
  }
}
