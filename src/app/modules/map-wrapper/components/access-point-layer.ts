import { EventEmitter } from '@angular/core';
import { DivIcon, divIcon, Icon, LatLngBounds, MarkerCluster, MarkerClusterGroup } from 'leaflet';
import { Observable } from 'rxjs';
import { AccessPoint } from '../model/access-point';
import 'leaflet.markercluster';
import { AccessPointMarker } from './access-point-marker';
import { ExtendedMap } from '../../../declarations/leaflet';
import { UpdatedList } from '@shared/utils/updated-list';

export const MAX_ZOOM = 12;

export abstract class AccessPointLayer<T extends AccessPoint> extends MarkerClusterGroup {
  private isInit = false;
  private maxZoom = MAX_ZOOM;
  private pointsList: UpdatedList<T>;
  private layers: { [key: number]: AccessPointMarker<T> };

  public readonly onMarkerClick: EventEmitter<AccessPointMarker<T>> = new EventEmitter<AccessPointMarker<T>>();
  private leafletMap: ExtendedMap;

  abstract getPoints(bounds?: LatLngBounds): Observable<T[]>;

  protected constructor() {
    // super({iconCreateFunction: AccessPointLayer.iconCreateFunction});
    super();
  }

  public onAdd(map: ExtendedMap): this {
    super.onAdd(map);

    if (!this.isInit) {
      this.init(map);
      this.isInit = true;
      this.pointsList.startUpdate();

      map.on({
        moveend: () => {
          if (map.hasLayer(this) && map.getZoom() >= this.maxZoom) {
            this.pointsList.forceUpdate();
          }
        },
        zoomend: () => {
          if (map.hasLayer(this) && map.getZoom() >= this.maxZoom) {
            this.pointsList.forceUpdate();
          } else {
            this.clearLayer();
          }
        }
      });
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
    this.layers[layer.feature.properties.id] = layer;
    return super.addLayer(layer);
  }

  public removeLayer(layer: AccessPointMarker<T>): this {
    this.layers[layer.feature.properties.id] = null;
    return super.removeLayer(layer);
  }

  public openUpdate() {
    this.pointsList.openUpdate();
  }

  public closeUpdate() {
    this.pointsList.closeUpdate();
  }

  public updateLayer() {
    this.pointsList.forceUpdate();
  }

  public renderPopup?(point: T): string;

  public removeArea() {
    this.setMaxZoom(MAX_ZOOM);
    this.openUpdate();
    if (this.leafletMap.getZoom() >= this.maxZoom) {
      this.updateLayer();
    } else {
      this.clearLayer();
    }
  }

  private clearLayer() {
    this.getLayers().forEach(l => this.removeLayer(l));
  }

  private init(map: ExtendedMap) {
    this.leafletMap = map;

    this.layers = {};

    if (!this.pointsList) {
      this.pointsList = new UpdatedList<T>(() => {
        map.spin(true);
        return this.getPoints(map.getBounds());
      });
    }

    this.pointsList.onUpdate.subscribe(points => {
      if (map.getZoom() >= this.maxZoom) {
        this.setPoints(points);
      } else {
        this.clearLayer();
      }
      map.spin(false);
    });

    this.on({
      add: () => {
        if (map.getZoom() >= this.maxZoom) {
          this.pointsList.forceUpdate();
        } else {
          this.clearLayer();
        }
      },
      remove: () => {
        this.pointsList.stopUpdate();
      }
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

  protected setMaxZoom(zoom: number) {
    this.maxZoom = zoom;
  }

  private createMarker(point: T): AccessPointMarker<T> {
    return new AccessPointMarker<T>(point)
      .on('click', (event) => this.onMarkerClick.emit(event.target));
  }

  private removeIrrelevantMarkers(points: T[]) {
    this.getLayers()
      .filter(pointMarker => !points.find(point => point.id === pointMarker.feature.properties.id))
      .forEach(pointMarker => this.removeLayer(pointMarker));
  }

  static iconCreateFunction(cluster: MarkerCluster): Icon | DivIcon {
    return divIcon({html: '<div class="cluster cluster-green">' + cluster.getChildCount() + '</div>'});
  }
}
