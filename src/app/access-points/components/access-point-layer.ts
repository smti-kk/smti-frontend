import { EventEmitter, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Icon, LatLngBounds, Layer, Map, marker, Marker } from 'leaflet';
import { Subject } from 'rxjs';
import AccessPoint from '../model/access-point';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';

const TIMER_INTERVAL = 10 * 60 * 1000;

export default abstract class AccessPointLayer<T extends AccessPoint> extends L.MarkerClusterGroup implements OnInit {
  protected layer;
  public feature: any = {};

  protected constructor() {
    super();
    this.feature.properties = {
      name: ''
    };
    this.layer = L.markerClusterGroup();
  }

  ngOnInit(): void {
    this.addToLayersControl(this.getLayersControl(), this.layer);

    if (!this.getMap()) {
      throw new Error('Required leaflet directive from @asymmetrik/ngx-leaflet');
    }

    const startStopUpdateSwitch = new EventEmitter<any>();

    this.getUpdatedPoints(TIMER_INTERVAL, startStopUpdateSwitch, this.getMap().getBounds.bind(this.getMap())).subscribe(points => {
      this.updateMarkers(points);
    });

    this.layer.on('add', () => {
      startStopUpdateSwitch.emit();
    });

    this.layer.on('remove', () => {
      startStopUpdateSwitch.emit();
    });

    this.getMap().on('moveend', () => {
      if (this.getMap().hasLayer(this.layer)) {
        startStopUpdateSwitch.emit();
        startStopUpdateSwitch.emit();
      }
    });
  }

  private updateMarkers(points: T[]) {
    this.layer.getLayers()
      .filter((pointMarker: any) => !points.find(point => point.pk === pointMarker.id))
      .forEach(pointMarker => this.layer.removeLayer(pointMarker));

    points.forEach(point => {
      const pointMarkers: any[] = this.layer.getLayers();

      const markerOnLayer: Marker = pointMarkers.find(pointMarker => pointMarker.id === point.pk);

      if (markerOnLayer) {
        if (markerOnLayer.getLatLng().lat !== point.point.lat &&
          markerOnLayer.getLatLng().lng !== point.point.lng) {
          markerOnLayer.setLatLng({lat: point.point.lat, lng: point.point.lng});
        }
        markerOnLayer.bindPopup(this.renderPopup(point));
      } else {
        const icon = new Icon({
          iconUrl: this.getIconUrl(),
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          shadowAnchor: [4, 62],
          popupAnchor: [-1, -25],
        });

        const pointMarker: Marker = marker([point.point.lat, point.point.lng], {icon})
          .bindPopup(this.renderPopup(point))
          .id = point.pk;

        pointMarker.feature = {
          properties: {
            name: point.name
          }
        };

        if (pointMarker.getLatLng()) {
          this.layer.addLayer(pointMarker);
        }
      }
    });
  }

  abstract getUpdatedPoints(interval: number, startStopUpdate?: EventEmitter<any>, bounds?: () => LatLngBounds): Subject<T[]>;

  abstract renderPopup(point: T): string;

  abstract getIconUrl(): string;

  abstract addToLayersControl(layersControl: LeafletControlLayersConfig, layer: Layer);

  abstract getLayersControl(): LeafletControlLayersConfig;

  abstract getMap(): Map;
}

