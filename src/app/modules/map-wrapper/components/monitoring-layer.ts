import { EventEmitter } from '@angular/core';
import { LatLngBounds, MarkerClusterGroup } from 'leaflet';
import { Observable } from 'rxjs';
import { MonitoringPoint } from '../model/monitoring-point';
import 'leaflet.markercluster';
import { MonitoringMarker } from './monitoring-marker';
import { ExtendedMap } from '../../../declarations/leaflet';
import {UpdatedList} from '@core/utils/updated-list';

export const MAX_ZOOM = 12;

export abstract class MonitoringLayer<T extends MonitoringPoint> extends MarkerClusterGroup {
  private maxZoom = MAX_ZOOM;
  private pointsList: UpdatedList<T>;
  private leafletMap: ExtendedMap;
  private layers: { [key: number]: MonitoringMarker<T> };
  public readonly onMarkerClick: EventEmitter<MonitoringMarker<T>> = new EventEmitter<MonitoringMarker<T>>();

  protected constructor() {
    super();
  }

  abstract getPoints(bounds?: LatLngBounds): Observable<T[]>;

  public onAdd(map: ExtendedMap): this {
    if (!this.leafletMap) {
      this.leafletMap = map;
      this.init(map);

      this.pointsList.startUpdate();
      map.on({
        moveend: () => this.updateLayer()
      });
    }

    return super.onAdd(map);
  }

  public getLayers(): MonitoringMarker<T>[] {
    return super.getLayers() as MonitoringMarker<T>[];
  }

  public getLayerByPointId(id: number) {
    return this.layers[id];
  }

  public addLayer(layer: MonitoringMarker<T>): this {
    this.layers[layer.feature.properties.id] = layer;
    return super.addLayer(layer);
  }

  public removeLayer(layer: MonitoringMarker<T>): this {
    this.layers[layer.feature.properties.id] = null;
    return super.removeLayer(layer);
  }

  protected openUpdate() {
    this.pointsList.openUpdate();
  }

  protected closeUpdate() {
    this.pointsList.closeUpdate();
  }

  protected renderPopup?(point: T): string;

  protected removeArea() {
    this.setMaxZoom(MAX_ZOOM);
    this.openUpdate();
    this.updateLayer();
  }

  protected updateLayer() {
    if (this.leafletMap && this.leafletMap.getZoom() >= this.maxZoom && this.leafletMap.hasLayer(this)) {
      this.pointsList.forceUpdate();
    } else {
      this.clearLayer();
    }
  }

  protected setMaxZoom(zoom: number) {
    this.maxZoom = zoom;
  }

  private clearLayer() {
    this.getLayers().forEach(l => this.removeLayer(l));
  }

  private init(map: ExtendedMap) {
    this.leafletMap = map;
    this.layers = {};
    this.pointsList = new UpdatedList<T>(
      () => {
        map.spin(true);
        return this.getPoints(map.getBounds());
      },
      (points) => {
        this.setPoints(points);
        map.spin(false);
      }
    );

    this.on({
      add: () => this.updateLayer(),
      remove: () => this.updateLayer()
    });
  }

  private setPoints(points: T[]) {
    this.removeIrrelevantMarkers(points);

    points.forEach(point => {
      let pointMarker = this.getLayerByPointId(point.id);

      if (pointMarker) {
        pointMarker.updateData(point);
      } else {
        pointMarker = this.createMarker(point);
      }

      if (this.renderPopup) {
        pointMarker.bindPopup(this.renderPopup(point));
      }

      if (!this.hasLayer(pointMarker)) {
        this.addLayer(pointMarker);
      }
    });
  }

  private createMarker(point: T): MonitoringMarker<T> {
    return new MonitoringMarker<T>(point)
      .on('click', (event) => this.onMarkerClick.emit(event.target));
  }

  private removeIrrelevantMarkers(points: T[]) {
    this.getLayers()
      .filter(pointMarker => !points.find(point => point.id === pointMarker.feature.properties.id))
      .forEach(pointMarker => this.removeLayer(pointMarker));
  }
}
