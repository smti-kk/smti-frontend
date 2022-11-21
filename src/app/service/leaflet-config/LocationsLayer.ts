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

    const allGood = markers.every((marker) => {
      const { quality } = marker.getOrigin<MapLocation>();
      return quality === 'GOOD'
    })
    const allAbsent = markers.every((marker) => {
      const { quality } = marker.getOrigin<MapLocation>();
      return quality === 'ABSENT'
    })

    let color = '';
    if (allGood) {
      color = '_green';
    } else if (allAbsent) {
      color = '_red';
    } else if (!allGood && !allAbsent) {
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
