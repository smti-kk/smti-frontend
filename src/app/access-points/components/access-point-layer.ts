import { EventEmitter, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Icon, LatLngBounds, Layer, Map, Marker, marker } from 'leaflet';
import { Subject } from 'rxjs';
import AccessPoint from '../model/access-point';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';

const TIMER_INTERVAL = 10 * 60 * 1000;

export default abstract class AccessPointLayer<T extends AccessPoint> extends L.MarkerClusterGroup implements OnInit {
  protected layer: L.MarkerClusterGroup;
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
    this.layer.getAllChildMarkers()
      .filter(pointMarker => !points.find(point => point.pk === pointMarker.feature.properties.id))
      .forEach(pointMarker => this.layer.removeLayer(pointMarker));

    points.forEach(point => {
      let pointMarker = this.layer.getAllChildMarkers().find(pm => pm.feature.properties.id === point.pk);

      if (pointMarker && pointMarker.getLatLng() !== point.point) {
        pointMarker.setLatLng(point.point);
      } else {
        pointMarker = this.createMarker(point);
      }

      if (pointMarker.getLatLng()) {
        pointMarker.bindPopup(this.renderPopup(point));
        this.layer.addLayer(pointMarker);
      }
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

    return pointMarker;
  }

  abstract getUpdatedPoints(interval: number, startStopUpdate?: EventEmitter<any>, bounds?: () => LatLngBounds): Subject<T[]>;

  abstract renderPopup(point: T): string;

  abstract getIconUrl(): string;

  abstract addToLayersControl(layersControl: LeafletControlLayersConfig, layer: Layer);

  abstract getLayersControl(): LeafletControlLayersConfig;

  abstract getMap(): Map;
}

