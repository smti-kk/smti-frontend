import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {DivIcon, Point, MarkerCluster} from 'leaflet';

import {MonitoringLayer} from '../components/monitoring-layer';
import {AdministrativeCenterPoint} from '../model/administrative-center-point';
import {MunicipalitiesLayerGeoJson} from './municipalities-layer';
import {AdministrativeCentersService} from '../service/administrative-centers.service';

@Injectable()
export class AdministrativeCentersLayer extends MonitoringLayer<AdministrativeCenterPoint> {
  areaId: string | number;

  constructor(private administrativeCentersService: AdministrativeCentersService) {
    super({iconCreateFunction: AdministrativeCentersLayer.iconCreateFunction});
  }

  filterByArea(area: MunicipalitiesLayerGeoJson): void {
    if (area) {
      this.areaId = area.feature.id;
      this.setMaxZoom(1);
      this.openUpdate();
      this.updateLayer();
      this.closeUpdate();
    } else {
      this.areaId = null;
      this.removeArea();
    }
  }

  filterByLocalityName(name: string): AdministrativeCenterPoint[] {
    return this.getLayers()
      .map(layer => layer.feature.properties)
      .filter(layer => layer.fullName.toLowerCase().includes(name.toLowerCase()));
  }

  getPoints(bounds): Observable<AdministrativeCenterPoint[]> {
    if (this.areaId) {
      return this.administrativeCentersService.listFilteredByArea(this.areaId);
    }
    return this.administrativeCentersService.listFilteredByBounds(bounds);
  }

  static iconCreateFunction(cluster: MarkerCluster): DivIcon {
    const childCount = cluster.getChildCount();

    const c = 'marker-cluster-administrative-centers';

    return new DivIcon({
      html: `<div><span>${childCount}</span></div>`,
      className: `marker-cluster ${c}`,
      iconSize: new Point(40, 40),
    });
  }
}
