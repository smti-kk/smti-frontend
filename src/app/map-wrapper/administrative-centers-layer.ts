import { AccessPointLayer, MAX_ZOOM } from './components/access-point-layer';
import { Observable } from 'rxjs';
import { AccessPointsService } from './service/access-points.service';
import { AdministrativeCenterPoint } from './model/administrative-center-point';
import { MunicipalitiesLayerGeoJson } from '@map-wrapper/municipalities-layer';


export class AdministrativeCentersLayer extends AccessPointLayer<AdministrativeCenterPoint> {
  constructor(private accessPointsService: AccessPointsService) {
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
      .map(layer => layer.feature.properties.point)
      .filter(layer => layer.name.toLowerCase().includes(name));
  }

  getPoints(): Observable<AdministrativeCenterPoint[]> {
    return this.accessPointsService.getAdministrativePoints();
  }
}

