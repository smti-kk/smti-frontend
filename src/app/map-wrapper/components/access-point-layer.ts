import { EventEmitter } from '@angular/core';
import { DivIcon, divIcon, Icon, LatLngBounds, Map, Marker, MarkerCluster, MarkerClusterGroup } from 'leaflet';
import { Observable, Subject } from 'rxjs';
import AccessPoint from '../model/access-point';
import 'leaflet.markercluster';
import { AccessPointMarker } from '@map-wrapper/components/access-point-marker';

export const TIMER_INTERVAL = 10 * 60 * 1000;
// const TIMER_INTERVAL = 10 * 1000;
export const MAX_ZOOM = 12;


export default abstract class AccessPointLayer<T extends AccessPoint> extends MarkerClusterGroup {
  public onMarkerClick: EventEmitter<Marker> = new EventEmitter<Marker>();
  private startUpdateSwitch = new EventEmitter<boolean>();
  private filter: (points: T[]) => T[];
  private maxZoom = MAX_ZOOM;
  private isInit = false;
  private layers: { [key: number]: AccessPointMarker<T> } = {};

  protected constructor() {
    // @ts-ignore
    // super({iconCreateFunction: AccessPointLayer.iconCreateFunction});
    super();
  }

  public onAdd(map: Map): this {

    super.onAdd(map);

    if (!this.isInit) {
      this.getUpdatedPoints(TIMER_INTERVAL, this.startUpdateSwitch, () => map.getBounds()).subscribe(points => {
        if (map.getZoom() >= this.maxZoom) {
          this.setPoints(points);
        } else {
          this.clearLayer();
        }
      });

      this.on('add', () => {
        if (map.getZoom() >= this.maxZoom) {
          this.startUpdateSwitch.emit(false);
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
          this.startUpdateSwitch.emit(false);
          this.startUpdateSwitch.emit(true);
        } else {
          this.clearLayer();
        }
      });

      this.isInit = true;
    }
    return this;
  }

  public getLayers(): AccessPointMarker<T>[] {
    return super.getLayers() as AccessPointMarker<T>[];
  }

  public getLayerByPointId(id: number) {
    return this.layers[id];
  }

  public addLayer(layer: AccessPointMarker<T>): this {
    this.layers[layer.feature.properties.point.pk] = layer;
    return super.addLayer(layer);
  }

  public removeLayer(layer: AccessPointMarker<T>): this {
    this.layers[layer.feature.properties.point.pk] = null;
    return super.removeLayer(layer);
  }

  private setPoints(points: T[]) {
    if (this.filter) {
      points = this.filter(points);
    }

    this.removeIrrelevantMarkers(points);

    points.forEach(point => {
      let pointMarker = this.getLayerByPointId(point.pk);

      if (pointMarker) {
        pointMarker.updateData(point);
      } else {
        pointMarker = this.createMarker(point);
        this.addLayer(pointMarker);
      }

      if (this.renderPopup) {
        pointMarker.bindPopup(this.renderPopup(point));
      }
    });
  }

  public setFilter(filter: (points: T[]) => T[]) {
    this.filter = filter;
    this.startUpdateSwitch.emit(true);
    this.startUpdateSwitch.emit(false);
  }

  public setMaxZoom(zoom: number) {
    this.maxZoom = zoom;
  }

  public renderPopup?(point: T): string;

  private createMarker(point: T): AccessPointMarker<T> {
    return new AccessPointMarker<T>(point)
      .on('click', (event) => this.onMarkerClick.emit(event.target));
  }

  private clearLayer() {
    this.getLayers().forEach(l => this.removeLayer(l));
  }

  private removeIrrelevantMarkers(points: T[]) {
    this.getLayers()
      .filter(pointMarker => !points.find(point => point.pk === pointMarker.feature.properties.point.pk))
      .forEach(pointMarker => this.removeLayer(pointMarker));
  }

  abstract getUpdatedPoints(interval: number,
                            startStopUpdate?: EventEmitter<boolean>,
                            bounds?: () => LatLngBounds): Subject<T[]> | Observable<T[]>;

  static iconCreateFunction(cluster: MarkerCluster): Icon | DivIcon {
    console.log(cluster);
    return divIcon({html: '<div class="cluster cluster-green">' + cluster.getChildCount() + '</div>'});
  }
}
