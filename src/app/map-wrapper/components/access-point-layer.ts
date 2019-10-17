import {EventEmitter} from '@angular/core';
import * as L from 'leaflet';
import {LatLngBounds, Map, Marker} from 'leaflet';
import {Observable, Subject} from 'rxjs';
import AccessPoint from '../model/access-point';
import 'leaflet.markercluster';
import {LocationCapabilities} from '../../shared/model/LocationCapabilities';
import {AccessPointMarker} from '@map-wrapper/components/access-point-marker';

const TIMER_INTERVAL = 10 * 60 * 1000;
export const MAX_ZOOM = 12;

export default abstract class AccessPointLayer<T extends AccessPoint> extends L.MarkerClusterGroup {
  public onMarkerClick: EventEmitter<Marker> = new EventEmitter<Marker>();
  private startUpdateSwitch = new EventEmitter<boolean>();
  private filter: (points: T[]) => T[];
  private maxZoom = MAX_ZOOM;
  private isInit = false;

  protected constructor() {
    super();
  }

  onAdd(map: Map): this {

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

  public getLayers(): AccessPointMarker<T>[] {
    return super.getLayers() as AccessPointMarker<T>[];
  }

  public getLayer(id: number): AccessPointMarker<T> {
    return super.getLayer(id) as AccessPointMarker<T>;
  }

  public addLayer(layer: AccessPointMarker<T>): this {
    return super.addLayer(layer);
  }

  private setPoints(points: T[]) {
    if (this.filter) {
      points = this.filter(points);
    }

    this.removeIrrelevantMarkers(points);

    points.forEach(point => {
      const pointMarker = this.getLayer(point.pk);

      if (pointMarker) {
        pointMarker.update(point);
      } else {
        this.addLayer(this.createMarker(point));
      }

      if (this.renderPopup) {
        pointMarker.bindPopup(this.renderPopup(point));
      }
    });
  }

  setFilter(filter: (points: T[]) => T[]) {
    this.filter = filter;
    this.startUpdateSwitch.emit(true);
    this.startUpdateSwitch.emit(false);
  }

  setMaxZoom(zoom: number) {
    this.maxZoom = zoom;
  }

  setFilterByLocation(location: LocationCapabilities, afterFilter: () => void) {
    this.setMaxZoom(1);
    this.setFilter(points => {
      const result = this.filterByLocationAddress(location, points);
      afterFilter();
      return result;
    });
  }

  removeFilter() {
    this.setMaxZoom(MAX_ZOOM);
    this.setFilter(null);
  }

  renderPopup?(point: T): string;

  private createMarker(point: T): AccessPointMarker<T> {
    return new AccessPointMarker<T>(point, this.getIconUrl(point))
      .on('click', (event) => this.onMarkerClick.emit(event.target));
  }

  private filterByLocationAddress(location, points: any[]) {
    return points.filter(point => point.actualAddress
      .includes(
        location.name
          .replace('г ', '')
          .replace('д ', '')
          .replace('п ', '')
          .replace('c ', '')
      )
    );
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

  abstract getIconUrl(point: AccessPoint): string;
}

