import { EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { Icon, LatLngBounds, Map, Marker, marker } from 'leaflet';
import { Observable, Subject } from 'rxjs';
import AccessPoint from '../model/access-point';
import 'leaflet.markercluster';

const TIMER_INTERVAL = 10 * 60 * 1000;

export default abstract class AccessPointLayer<T extends AccessPoint> extends L.MarkerClusterGroup {
  public onMarkerClick: EventEmitter<Marker> = new EventEmitter<Marker>();
  private startUpdateSwitch = new EventEmitter<boolean>();

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

    this.getUpdatedPoints(TIMER_INTERVAL, this.startUpdateSwitch, () => map.getBounds()).subscribe(points => {
      this.updateMarkers(points);
    });

    this.on('add', () => {
      if (map.getZoom() >= 12) {
        this.startUpdateSwitch.emit(true);
      } else {
        this.clearLayer();
      }
    });

    this.on('remove', () => {
      this.startUpdateSwitch.emit(false);
    });

    map.on('moveend', () => {
      if (map.hasLayer(this) && map.getZoom() >= 12) {
        this.startUpdateSwitch.emit(true);
      } else {
        this.clearLayer();
      }
    });

    return this;
  }

  private updateMarkers(points: T[]) {
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
      iconUrl: this.getIconUrl(),
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowAnchor: [4, 62],
      popupAnchor: [-1, -25],
    });

    const pointMarker = marker([point.point.lat, point.point.lng], {icon});

    pointMarker.feature = {
      properties: {
        name: point.name,
        id: point.pk
      },
      type: 'Feature',
      geometry: null
    };

    pointMarker.on('click', () => this.onMarkerClick.emit(pointMarker));

    return pointMarker;
  }

  private clearLayer() {
    this.getLayers().forEach(l => this.removeLayer(l));
  }

  abstract getUpdatedPoints(interval: number,
                            startStopUpdate?: EventEmitter<boolean>,
                            bounds?: () => LatLngBounds): Subject<T[]> | Observable<T[]>;

  abstract getIconUrl(): string;

  abstract renderPopup(point: T): string;
}

