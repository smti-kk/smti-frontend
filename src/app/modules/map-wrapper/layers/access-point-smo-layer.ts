import { LatLngBounds } from 'leaflet';
import { Observable } from 'rxjs';
import { MonitoringLayer } from '../components/monitoring-layer';
import { SmoService } from '../service/smo.service';
import { Injectable } from '@angular/core';
import {Reaccesspoint} from '@core/models/reaccesspoint';

@Injectable()
export class AccessPointSmoLayer extends MonitoringLayer<Reaccesspoint> {
  constructor(private smoService: SmoService) {
    super();
  }

  getPoints(bounds?: LatLngBounds): Observable<Reaccesspoint[]> {
    if (bounds) {
      return this.smoService.listFilteredByBounds(bounds);
    } else {
      return this.smoService.list();
    }
  }
}
