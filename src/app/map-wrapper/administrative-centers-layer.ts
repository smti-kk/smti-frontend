import { EventEmitter } from '@angular/core';
import AccessPointLayer from './components/access-point-layer';
import { Observable } from 'rxjs';
import { LatLngBounds } from 'leaflet';
import { AccessPointsService } from './service/access-points.service';
import AdministrativeCenterPoint from './model/administrative-center-point';


export class AdministrativeCentersLayer extends AccessPointLayer<AdministrativeCenterPoint> {
  constructor(private accessPointsService: AccessPointsService) {
    super();
  }

  getUpdatedPoints(interval: number,
                   startStopUpdate?: EventEmitter<any>,
                   bounds?: () => LatLngBounds): Observable<AdministrativeCenterPoint[]> {
    return this.accessPointsService.getUpdatedAdministrativeCenterPoints(interval, startStopUpdate);
  }
}

