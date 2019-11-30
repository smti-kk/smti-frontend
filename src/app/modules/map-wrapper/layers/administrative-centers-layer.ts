import { MonitoringLayer } from '../components/monitoring-layer';
import { Observable } from 'rxjs';
import { AdministrativeCenterPoint } from '../model/administrative-center-point';
import { MunicipalitiesLayerGeoJson } from './municipalities-layer';
import { Injectable } from '@angular/core';
import { AdministrativeCentersService } from '../service/administrative-centers.service';

@Injectable()
export class AdministrativeCentersLayer extends MonitoringLayer<AdministrativeCenterPoint> {

  areaId: string | number;

  constructor(private administrativeCentersService: AdministrativeCentersService) {
    super();
  }

  filterByArea(area: MunicipalitiesLayerGeoJson) {
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
      .filter(layer => layer.name.toLowerCase().includes(name.toLowerCase()));
  }

  getPoints(bounds): Observable<AdministrativeCenterPoint[]> {
    if (this.areaId) {
      return this.administrativeCentersService.listFilteredByArea(this.areaId);
    } else {
      return this.administrativeCentersService.listFilteredByBounds(bounds);
    }
  }
}

