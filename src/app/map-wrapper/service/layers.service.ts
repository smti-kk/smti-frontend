import { Injectable } from '@angular/core';
import { MunicipalitiesLayer } from '@map-wrapper/municipalities-layer';
import { MunicipalityService } from '@map-wrapper/service/municipality.service';
import { Subject } from 'rxjs';
import { AdministrativeCentersLayer } from '@map-wrapper/administrative-centers-layer';
import { AccessPointsService } from '@map-wrapper/service/access-points.service';
import AdministrativeCenterPoint from '@map-wrapper/model/administrative-center-point';
import { Marker } from 'leaflet';
import { MAX_ZOOM } from '@map-wrapper/components/access-point-layer';
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
  private administrativeCentersLayer: AdministrativeCentersLayer;

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

  getAdministrativeCenters(): AdministrativeCentersLayer {
    if (!this.administrativeCentersLayer) {
      this.administrativeCentersLayer = new AdministrativeCentersLayer(this.accessPointsService);
    }
    return this.administrativeCentersLayer;
  }

  getAdministrativePointsByArea(area: any): AdministrativeCenterPoint[] {
    if (this.administrativeCentersLayer && area) {
      this.administrativeCentersLayer.setMaxZoom(1);

      const resultPoints = [];

      this.administrativeCentersLayer.setFilter((points) => {
        resultPoints.splice(0, resultPoints.length);

        const administrativeCenterPoints = points.filter(p => p.area === area.feature.properties.name);
        administrativeCenterPoints.forEach(p => resultPoints.push(p));

        return administrativeCenterPoints;
      });

      return resultPoints;
    } else if (this.administrativeCentersLayer && !area) {
      this.administrativeCentersLayer.setMaxZoom(MAX_ZOOM);
      this.administrativeCentersLayer.setFilter(null);
      return [];
    } else {
      return [];
    }
  }

  getAdministrativeMarker(administrativePoint: AdministrativeCenterPoint): Marker {
    return this.administrativeCentersLayer
      .getLayers()
      .find((layer: Marker) => layer.feature.properties.point.pk === administrativePoint.pk) as Marker;
  }
}
