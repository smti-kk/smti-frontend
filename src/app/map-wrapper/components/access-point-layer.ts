import { EventEmitter } from '@angular/core';
import { DivIcon, divIcon, Icon, LatLngBounds, Marker, MarkerCluster, MarkerClusterGroup } from 'leaflet';
import { Observable } from 'rxjs';
import { AccessPoint } from '../model/access-point';
import 'leaflet.markercluster';
import { AccessPointMarker } from '@map-wrapper/components/access-point-marker';
import { ExtendedMap } from '../../declarations/leaflet';
import { UpdatedList } from '../../shared/utils/updated-list';

const MINUTES = 5;
const SECONDS = 60;
const MILLISECONDS = 1000;

export const TIMER_INTERVAL = MINUTES * SECONDS * MILLISECONDS;
export const MAX_ZOOM = 12;

export abstract class AccessPointLayer<T extends AccessPoint> extends MarkerClusterGroup {
  private filter: (points: T[]) => T[];
  private isInit = false;
  private maxZoom = MAX_ZOOM;
  private pointsList: UpdatedList<T>;

  public readonly onMarkerClick: EventEmitter<Marker> = new EventEmitter<Marker>();
  private readonly layers: { [key: number]: AccessPointMarker<T> } = {};

  protected constructor() {
    // super({iconCreateFunction: AccessPointLayer.iconCreateFunction});
    super();
  }

  public onAdd(map: ExtendedMap): this {
    super.onAdd(map);

    if (!this.isInit) {
      this.isInit = true;

      this.init(map);

      map.on({
        moveend: () => {
          if (map.hasLayer(this) && map.getZoom() >= this.maxZoom) {
            this.pointsList.update();
          }
        },
        zoomend: () => {
          if (map.hasLayer(this) && map.getZoom() >= this.maxZoom) {
            this.pointsList.update();
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
    this.layers[layer.feature.properties.point.pk] = layer;
    return super.addLayer(layer);
  }

  public removeLayer(layer: AccessPointMarker<T>): this {
    this.layers[layer.feature.properties.point.pk] = null;
    return super.removeLayer(layer);
  }

  public setFilter(filter: (points: T[]) => T[]) {
    this.filter = filter;
    this.pointsList.update();
  }

  public setMaxZoom(zoom: number) {
    this.maxZoom = zoom;
  }

  public renderPopup?(point: T): string;

  abstract getPoints(bounds?: LatLngBounds): Observable<T[]>;

  private init(map: ExtendedMap) {
    this.pointsList = new UpdatedList<T>(() => {
      map.spin(true);
      return this.getPoints(map.getBounds());
    });

    this.pointsList.onUpdate.subscribe(points => {
      if (map.getZoom() >= this.maxZoom) {
        this.setPoints(points);
      }
      map.spin(false);
    });

    this.on({
      add: () => {
        if (map.getZoom() >= this.maxZoom) {
          this.pointsList.update();
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

  static iconCreateFunction(cluster: MarkerCluster): Icon | DivIcon {
    console.log(cluster);
    return divIcon({html: '<div class="cluster cluster-green">' + cluster.getChildCount() + '</div>'});
  }
}
