import {LatLngBounds, layerGroup, Map, MarkerClusterGroup, MarkerClusterGroupOptions, Tooltip} from 'leaflet';
import {PointsService} from '../points/PointsService';
import 'leaflet.markercluster';
import {PointsLayer} from './PointsLayer';
import {Observable} from 'rxjs';
import {MonitoringPoint} from '../points/MonitoringPoint';
import {tap} from 'rxjs/operators';

let selectedElement: MonitoringPoint;
let selectedElementLayer: MarkerClusterGroup;

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
    if (!this.existedPoints[id]) {
      console.error('unknown point with id' + id);
      return;
    }
    this.map.flyTo(this.existedPoints[id].getLatLng(), this.map.getZoom(), {animate: true});
    if (selectedElement) {
      this.map.removeLayer(selectedElement);
      selectedElementLayer.addLayer(selectedElement);
    }
    selectedElement = this.existedPoints[id];
    selectedElementLayer = this;
    this.removeLayer(selectedElement);
    this.map.addLayer(selectedElement);
    this.existedPoints[id].getElement().classList.add('selected-marker');
  }
}
