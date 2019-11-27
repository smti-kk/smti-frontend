import { AccessPointLayer, MAX_ZOOM } from '../components/access-point-layer';
import { Observable } from 'rxjs';
import { AdministrativeCenterPoint } from '../model/administrative-center-point';
import { MunicipalitiesLayerGeoJson } from './municipalities-layer';
import { Injectable } from '@angular/core';
import { AdministrativeCentersService } from '../service/administrative-centers.service';

@Injectable()
export class AdministrativeCentersLayer extends AccessPointLayer<AdministrativeCenterPoint> {

  areaId: string | number;

  constructor(private administrativeCentersService: AdministrativeCentersService) {
    super();
  }

  filterByArea(area: MunicipalitiesLayerGeoJson) {
    if (area) {
      console.log(area);
      this.areaId = area.feature.id;
      this.setMaxZoom(1);
    } else {
      this.setMaxZoom(MAX_ZOOM);
      this.areaId = null;
    }
  }

  filterByLocalityName(name: string): AdministrativeCenterPoint[] {
    return this.getLayers()
      .map(layer => layer.feature.properties)
      .filter(layer => layer.name.toLowerCase().includes(name.toLowerCase()));
  }

  getPoints(bounds): Observable<AdministrativeCenterPoint[]> {
    console.log(this.areaId);
    if (this.areaId) {
      return this.administrativeCentersService.listFilteredByArea(this.areaId);
    } else {
      return this.administrativeCentersService.listFilteredByBounds(bounds);
    }
  }
}

