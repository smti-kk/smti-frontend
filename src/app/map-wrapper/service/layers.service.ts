import { Injectable } from '@angular/core';
import { MunicipalitiesLayer } from '@map-wrapper/municipalities-layer';
import { MunicipalityService } from '@map-wrapper/service/municipality.service';
import { Subject } from 'rxjs';
import { AdministrativeCentersLayer } from '@map-wrapper/administrative-centers-layer';
import { AccessPointsService } from '@map-wrapper/service/access-points.service';
import { AccessPointEspdLayer } from '@map-wrapper/access-point-espd-layer';
import { AccessPointSmoLayer } from '@map-wrapper/access-point-smo-layer';
import { MapWrapperModule } from '@map-wrapper/map-wrapper.module';

@Injectable({
  providedIn: MapWrapperModule
})
export class LayersService {
  private _municipalitiesLayer: Subject<MunicipalitiesLayer> = new Subject<MunicipalitiesLayer>();
  private _espdLayer: AccessPointEspdLayer;
  private _smoLayer: AccessPointSmoLayer;
  private _administrativeCentersLayer: AdministrativeCentersLayer;

  constructor(private municipalitiesService: MunicipalityService,
              private accessPointsService: AccessPointsService) {
    municipalitiesService.municipalitiesAreas.subscribe(ma => {
      this.municipalitiesLayer.next(new MunicipalitiesLayer(ma));
    });
  }


  get municipalitiesLayer(): Subject<MunicipalitiesLayer> {
    return this._municipalitiesLayer;
  }

  get espdLayer(): AccessPointEspdLayer {
    if (!this._espdLayer) {
      this._espdLayer = new AccessPointEspdLayer(this.accessPointsService);
    }
    return this._espdLayer;
  }

  get smoLayer(): AccessPointSmoLayer {
    if (!this._smoLayer) {
      this._smoLayer = new AccessPointSmoLayer(this.accessPointsService);
    }
    return this._smoLayer;
  }

  get administrativeCentersLayer(): AdministrativeCentersLayer {
    if (!this._administrativeCentersLayer) {
      this._administrativeCentersLayer = new AdministrativeCentersLayer(this.accessPointsService);
    }
    return this._administrativeCentersLayer;
  }
}
