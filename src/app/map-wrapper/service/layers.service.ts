import { Injectable } from '@angular/core';
import MunicipalitiesLayer from '@map-wrapper/municipalities-layer';
import MunicipalityService from '@map-wrapper/service/municipality.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdministrativeCentersLayer } from '@map-wrapper/administrative-centers-layer';
import AccessPointsService from '@map-wrapper/service/access-points.service';
import AdministrativeCenterPoint from '@map-wrapper/model/administrative-center-point';
import { Marker } from 'leaflet';
import { MAX_ZOOM } from '@map-wrapper/components/access-point-layer';

@Injectable()
export class LayersService {
  private municipalitiesLayer: MunicipalitiesLayer;
  private administrativeCentersLayer: AdministrativeCentersLayer;

  constructor(private municipalitiesService: MunicipalityService,
              private accessPointsService: AccessPointsService) {

  }

  getMunicipalities(): Observable<MunicipalitiesLayer> {
    if (this.municipalitiesLayer) {
      return of(this.municipalitiesLayer);
    }

    return this.municipalitiesService.getMunicipalitiesArea()
      .pipe(map(ma => {
        if (!this.municipalitiesLayer) {
          this.municipalitiesLayer = new MunicipalitiesLayer(ma);
        }
        return this.municipalitiesLayer;
      }));
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
      .find((layer: Marker) => layer.feature.properties.id === administrativePoint.pk) as Marker;
  }

  getPointArea(point: Marker) {
    if (this.municipalitiesLayer) {
      return this.municipalitiesLayer.getLayers().find((ml: any) => ml.feature.properties.name === point.feature.properties.area);
    }
  }
}
