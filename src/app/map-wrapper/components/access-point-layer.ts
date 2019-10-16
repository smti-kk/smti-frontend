import { EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { Icon, LatLngBounds, Map, Marker, marker } from 'leaflet';
import { Observable, Subject } from 'rxjs';
import AccessPoint from '../model/access-point';
import 'leaflet.markercluster';

const TIMER_INTERVAL = 10 * 60 * 1000;
export const MAX_ZOOM = 12;

export default abstract class AccessPointLayer<T extends AccessPoint> extends L.MarkerClusterGroup {
  public onMarkerClick: EventEmitter<Marker> = new EventEmitter<Marker>();
  private startUpdateSwitch = new EventEmitter<boolean>();
  private filter: (points: T[]) => T[];
  private maxZoom = MAX_ZOOM;
  private isInit = false;

  public feature: any = {
    properties: {
      name: ''
    }
  };

  protected constructor() {
    super();
  }

  onAdd(map: Map): this {

    super.onAdd(map);

    if (!this.isInit) {
      this.getUpdatedPoints(TIMER_INTERVAL, this.startUpdateSwitch, () => map.getBounds()).subscribe(points => {
        if (map.getZoom() >= this.maxZoom) {
          this.updateMarkers(points);
        } else {
          this.clearLayer();
        }
      });

      this.on('add', () => {
        if (map.getZoom() >= this.maxZoom) {
          this.startUpdateSwitch.emit(true);
        } else {
          this.clearLayer();
        }
      });

      this.on('remove', () => {
        this.startUpdateSwitch.emit(false);
      });

      map.on('moveend', () => {
        if (map.hasLayer(this) && map.getZoom() >= this.maxZoom) {
          this.startUpdateSwitch.emit(true);
        } else {
          this.clearLayer();
        }
      });

      this.isInit = true;
    }

    return this;
  }

  private updateMarkers(points: T[]) {
    if (this.filter) {
      points = this.filter(points);
    }

    const markers = this.getLayers() as Marker[];

    markers
      .filter(pointMarker => !points.find(point => point.pk === pointMarker.feature.properties.id))
      .forEach(pointMarker => this.removeLayer(pointMarker));

    points.forEach(point => {
      let pointMarker = markers.find(pm => pm.feature.properties.id === point.pk);

      if (pointMarker && (pointMarker.getLatLng().lng !== point.point.lng || pointMarker.getLatLng().lat !== point.point.lat)) {
        pointMarker.setLatLng({
          lat: point.point.lat,
          lng: point.point.lng
        });
      } else if (!pointMarker) {
        pointMarker = this.createMarker(point);
        this.addLayer(pointMarker);
      }

      pointMarker.bindPopup(this.renderPopup(point));
    });
  }

  private createMarker(point: T): Marker {
    const icon = new Icon({
      iconUrl: this.getIconUrl(point),
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowAnchor: [4, 62],
      popupAnchor: [-1, -25],
    });

    const pointMarker = marker([point.point.lat, point.point.lng], {icon});

    pointMarker.feature = {
      properties: {
        name: point.name,
        id: point.pk,
        area: point.area
      },
      type: 'Feature',
      geometry: null
    };

    pointMarker.on('click', () => this.onMarkerClick.emit(pointMarker));

    return pointMarker;
  }

  setFilter(filter: (points: T[]) => T[]) {
    this.filter = filter;
    this.startUpdateSwitch.emit(true);
    this.startUpdateSwitch.emit(false);
  }

  setMaxZoom(zoom: number) {
    this.maxZoom = zoom;
  }

  private clearLayer() {
    this.getLayers().forEach(l => this.removeLayer(l));
  }

  abstract getUpdatedPoints(interval: number,
                            startStopUpdate?: EventEmitter<boolean>,
                            bounds?: () => LatLngBounds): Subject<T[]> | Observable<T[]>;

  abstract getIconUrl(point: AccessPoint): string;

  abstract renderPopup(point: T): string;
}

