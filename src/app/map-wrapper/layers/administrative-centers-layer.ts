import { AccessPointLayer, MAX_ZOOM } from '../components/access-point-layer';
import { Observable } from 'rxjs';
import { AdministrativeCenterPoint } from '../model/administrative-center-point';
import { MunicipalitiesLayerGeoJson } from '@map-wrapper/layers/municipalities-layer';
import { Injectable } from '@angular/core';
import { AdministrativeCentersService } from '@map-wrapper/service/administrative-centers.service';

@Injectable()
export class AdministrativeCentersLayer extends AccessPointLayer<AdministrativeCenterPoint> {
  constructor(private administrativeCentersService: AdministrativeCentersService) {
    super();
  }

  filterByArea(area: MunicipalitiesLayerGeoJson): Promise<AdministrativeCenterPoint[]> {
    if (area) {
      this.setMaxZoom(1);
      return this.setFilter(points => points.filter(p => p.area === area.feature.properties.name));
    } else {
      this.setMaxZoom(MAX_ZOOM);
      return this.setFilter(null);
    }
  }

  filterByLocalityName(name: string): AdministrativeCenterPoint[] {
    return this.getLayers()
      .map(layer => layer.feature.properties)
      .filter(layer => layer.name.toLowerCase().includes(name.toLowerCase()));
  }

  getPoints(): Observable<AdministrativeCenterPoint[]> {
    return this.administrativeCentersService.list();
  }
}

