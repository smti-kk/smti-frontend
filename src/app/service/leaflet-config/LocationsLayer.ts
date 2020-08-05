import {PointsLayerImpl} from './PointsLayerImpl';
import {PointsService} from '../points/PointsService';
import {DivIcon, MarkerCluster, Point} from 'leaflet';

export class LocationsLayer extends PointsLayerImpl {
  constructor(pointsService: PointsService) {
    super(pointsService, {iconCreateFunction: LocationsLayer.iconCreateFunction});
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
}

