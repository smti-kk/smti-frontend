import { EventEmitter } from '@angular/core';
import { AccessPointLayer } from './components/access-point-layer';
import { Observable } from 'rxjs';
import { LatLngBounds } from 'leaflet';
import { AccessPointsService } from './service/access-points.service';
import { AdministrativeCenterPoint } from './model/administrative-center-point';
import { MunicipalitiesLayerGeoJson } from '@map-wrapper/municipalities-layer';


export class AdministrativeCentersLayer extends AccessPointLayer<AdministrativeCenterPoint> {
  constructor(private accessPointsService: AccessPointsService) {
    super();
  }

  getUpdatedPoints(interval: number,
                   startStopUpdate?: EventEmitter<boolean>,
                   bounds?: () => LatLngBounds): Observable<AdministrativeCenterPoint[]> {
    return this.accessPointsService.getUpdatedAdministrativeCenterPoints(interval, startStopUpdate);
  }

  setFilterByArea(area: MunicipalitiesLayerGeoJson) {
    super.setFilter(points => points.filter(p => p.area === area.feature.properties.name));
  }

  getAdministrativePoints(area: MunicipalitiesLayerGeoJson, name: string) {
    this.getLayers()
      .map(layer => layer.feature.properties.point)
      .filter(layer => layer.name.toLowerCase().includes(name));
  }
}

