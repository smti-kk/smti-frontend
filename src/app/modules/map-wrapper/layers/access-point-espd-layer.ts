import {DivIcon, LatLngBounds, MarkerCluster, Point} from 'leaflet';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

import {MonitoringMarker} from '@map-wrapper/components/monitoring-marker';
import {Reaccesspoint} from '@core/models/reaccesspoint';

import {EspdService} from '../service/espd.service';
import {MonitoringLayer} from '../components/monitoring-layer';

@Injectable()
export class AccessPointEspdLayer extends MonitoringLayer<Reaccesspoint> {
  constructor(private espdService: EspdService) {
    super({iconCreateFunction: AccessPointEspdLayer.iconCreateFunction});
  }

  getPoints(bounds?: LatLngBounds): Observable<Reaccesspoint[]> {
    if (bounds) {
      return this.espdService.listFilteredByBounds(bounds);
    }
    return this.espdService.list();
  }

  static iconCreateFunction(cluster: MarkerCluster): DivIcon {
    const childMarkers = cluster.getAllChildMarkers() as MonitoringMarker<Reaccesspoint>[];
    const childCount = cluster.getChildCount();

    let c = ' marker-cluster-';
    if (
      childMarkers.find(
        cm => cm.feature.properties.avstatus && !cm.feature.properties.avstatus.available
      )
    ) {
      c += 'large';
    } else if (childMarkers.find(cm => cm.feature.properties.avstatus)) {
      c += 'small';
    } else {
      c += 'undefined';
    }

    return new DivIcon({
      html: `<div><span>${childCount}</span></div>`,
      className: `marker-cluster ${c}`,
      iconSize: new Point(40, 40),
    });
  }
}
