import {LatLngBounds, Map, MarkerClusterGroup, MarkerClusterGroupOptions} from 'leaflet';
import {PointsService} from '../points/PointsService';
import 'leaflet.markercluster';
import {PointsLayer} from './PointsLayer';
import {Observable} from 'rxjs';
import {MonitoringPoint} from '../points/MonitoringPoint';
import {tap} from 'rxjs/operators';
import {MunicipalitiesLayer} from '@service/leaflet-config/MunicipalitiesLayer';
import {Injectable} from "@angular/core";

let selectedElement: MonitoringPoint;
let selectedElementLayer: MarkerClusterGroup;
let selectedElementMap: Map;

@Injectable()
export class PointsLayerImpl extends MarkerClusterGroup implements PointsLayer {
  private readonly pointsService: PointsService;
  private readonly existedPoints: { [id: string]: MonitoringPoint };
  private map: Map;

  constructor(pointsService: PointsService, options?: MarkerClusterGroupOptions) {
    // @ts-ignore
    super(options);
    this.pointsService = pointsService;
    this.existedPoints = {};
  }

  static resetFocus(): void {
    if (selectedElement) {
      selectedElementMap.removeLayer(selectedElement);
      selectedElementLayer.addLayer(selectedElement);
    }
    selectedElementMap = null;
    selectedElementLayer = null;
    selectedElement = null;
  }

  static resetFocusIfConnectionPoint(): void {
    if (selectedElement) {
      selectedElementMap.removeLayer(selectedElement);
      selectedElementLayer.addLayer(selectedElement);
    }
    selectedElementMap = null;
    selectedElementLayer = null;
    selectedElement = null;
  }

  addToMap(map: Map): boolean {
    this.map = map;
    if (map.hasLayer(this)) {
      return false;
    }
    map.addLayer(this);
    return true;
  }

  removeFromMap(map: Map): boolean {
    if (map.hasLayer(this)) {
      map.removeLayer(this);
      return true;
    }
    return false;
  }

  reloadByBounds(bounds: LatLngBounds): Observable<MonitoringPoint[]> {
    return this.pointsService.getPointsByBounds(bounds)
      .pipe(
        tap(points => {
          points.forEach(point => {
            if (this.existedPoints[point.getId()]) {
              this.removeLayer(this.existedPoints[point.getId()]);
            }
            this.existedPoints[point.getId()] = point;
              this.addLayer(point);
          });
        })
      );
  }

  moveToPoint(id: number): void {
    MunicipalitiesLayer.resetFocus();
    if (!this.existedPoints[id]) {
      console.error('unknown point with id' + id);
      return;
    }
    this.map.flyTo(this.existedPoints[id].getLatLng(), this.map.getZoom(), {animate: true});
    if (selectedElement) {
      selectedElementMap.removeLayer(selectedElement);
      selectedElementLayer.addLayer(selectedElement);
    }
    selectedElement = this.existedPoints[id];
    selectedElementLayer = this;
    selectedElementMap = this.map;
    this.removeLayer(selectedElement);
    this.map.addLayer(selectedElement);
    this.existedPoints[id].getElement().classList.add('selected-marker');
  }
}
