import {LatLngBounds, Map, MarkerClusterGroup, MarkerClusterGroupOptions} from 'leaflet';
import {PointsService} from '../points/PointsService';
import 'leaflet.markercluster';
import {PointsLayer} from './PointsLayer';
import {Observable} from 'rxjs';
import {Point} from '../points/Point';
import {tap} from 'rxjs/operators';

export class PointsLayerImpl extends MarkerClusterGroup implements PointsLayer {
  private readonly pointsService: PointsService;
  private readonly existedPoints: { [id: string]: Point };
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

  reloadByBounds(bounds: LatLngBounds): Observable<Point[]> {
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
    this.map.flyTo(this.existedPoints[id].getLatLng(), 15, {animate: false});
  }
}
