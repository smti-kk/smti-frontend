import {PointsLayerImpl} from './PointsLayerImpl';
import {PointsService} from '../points/PointsService';
import {DivIcon, MarkerCluster, Point} from 'leaflet';
import {PointWithState} from '../points/PointWithState';
import {LayerType} from '@service/leaflet-config/LayerType';

export class LayerWithState extends PointsLayerImpl {

  constructor(pointsService: PointsService, type: LayerType) {
    super(pointsService, {iconCreateFunction: LayerWithState.iconCreateFunction(type)});
  }

  private static iconCreateFunction(type: LayerType): (cluster: MarkerCluster) => DivIcon {
    return (cluster: MarkerCluster) => {
      const childMarkers = cluster.getAllChildMarkers() as PointWithState[];
      const childCount = cluster.getChildCount();
      let c = ' marker-cluster-';
      if (childMarkers.find(cm => cm.getState() === 'Не_работает')) {
        c += 'disabled';
      } else if (childMarkers.find(cm => cm.getState() === 'Работает')) {
        c += 'active';
      } else {
        c += 'undefined';
      }
      return new DivIcon({
        html: `<div><span>${childCount}</span></div>`,
        className: `marker-cluster ${type} ${c}`,
        iconSize: new Point(40, 40),
      });
    };
  }
}
