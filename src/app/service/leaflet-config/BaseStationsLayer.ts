import {PointsLayerImpl} from './PointsLayerImpl';
import {PointsService} from '../points/PointsService';
import {circle, DivIcon, LatLngBounds, LayerGroup, MarkerCluster, Point} from 'leaflet';
import {Observable} from 'rxjs';
import {MonitoringPoint} from '../points/MonitoringPoint';
import {tap} from 'rxjs/operators';
import {BaseStation} from '@api/dto/BaseStation';
import {MobileType} from '@api/dto/MobileType';
import {CellularType} from '@api/dto/CellularType';

export class BaseStationsLayer extends PointsLayerImpl {
  private readonly types: CellularType[];

  constructor(pointsService: PointsService, types: CellularType[]) {
    super(pointsService, {disableClusteringAtZoom: 1});
    this.types = types;
  }

  private static iconCreateFunction(cluster: MarkerCluster): DivIcon {
    const childCount = cluster.getChildCount();
    const c = 'marker-cluster-administrative-centers';
    return new DivIcon({
      html: `<div><span>${childCount}</span></div>`,
      className: `marker-cluster ${c}`,
      iconSize: new Point(40, 40),
    });
  }

  reloadByBounds(bounds: LatLngBounds): Observable<MonitoringPoint[]> {
    return super.reloadByBounds(bounds).pipe(
      tap(response => {
        response
          .filter(point => {
            this.removeLayer(point);
            return !!this.types.find(type => type === point.getOrigin<BaseStation>().mobileType.name);
          })
          .forEach(point => {
            const station = point.getOrigin<BaseStation>();
            let color;
            switch (station.mobileType.name) {
              case '2G':
                color = 'orange';
                break;
              case '3G':
                color = 'red';
                break;
              case '4G':
                color = 'green';
                break;
              case '5G':
                color = 'blue';
                break;
              case 'UNDEFINED':
                color = 'blue';
                break;
            }
            this.addLayer(
              new LayerGroup([
                point,
                circle(station.point, {radius: station.coverageRadius, fillColor: color, color})
              ])
            );
          });
      })
    );
  }
}
