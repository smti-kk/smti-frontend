import {PointsLayerImpl} from './PointsLayerImpl';
import {PointsService} from '../points/PointsService';
import {DivIcon, MarkerCluster, Point} from 'leaflet';

export class SMOLayer extends PointsLayerImpl {
  constructor(pointsService: PointsService) {
    super(pointsService, {iconCreateFunction: SMOLayer.iconCreateFunction});
  }

  private static iconCreateFunction(cluster: MarkerCluster): DivIcon {
    const childCount = cluster.getChildCount();
    const c = 'marker-cluster-smo';
    return new DivIcon({
      html: `<div><span>${childCount}</span></div>`,
      className: `marker-cluster ${c}`,
      iconSize: new Point(40, 40),
    });
  }
}
