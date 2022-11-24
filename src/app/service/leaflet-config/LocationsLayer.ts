import { PointsLayerImpl } from './PointsLayerImpl';
import { PointsService } from '../points/PointsService';
import { DivIcon, MarkerCluster, point, Point } from 'leaflet';
import { MonitoringPoint } from '@service/points/MonitoringPoint';
import { MapLocation } from '@api/dto/MapLocation';

export class LocationsLayer extends PointsLayerImpl {
  constructor(pointsService: PointsService) {
    super(pointsService, {
      iconCreateFunction: LocationsLayer.iconCreateFunction,
    });
  }

  private static iconCreateFunction(cluster: MarkerCluster): DivIcon {
    const markers = cluster.getAllChildMarkers() as MonitoringPoint[];

    const allGreen = markers.every((marker) => {
      const iconClassName = marker.getIconClassName()
      return iconClassName.includes('marker_green')
    })
    const allRed = markers.every((marker) => {
      const iconClassName = marker.getIconClassName()
      return iconClassName.includes('marker_red')
    })

    let color = '';
    if (allGreen) {
      color = '_green';
    } else if (allRed) {
      color = '_red';
    } else if (!allGreen && !allRed) {
      color = '_yellow';
    }


    const childCount = cluster.getChildCount();
    const c = 'marker-cluster-administrative-centers';
    return new DivIcon({
      html: `<div><span>${childCount}</span></div>`,
      className: `marker-cluster ${c} ${c}${color}`.trim(),
      iconSize: new Point(40, 40),
      iconAnchor: [40, 40],
    });
  }
}
