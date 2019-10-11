import { Injectable } from '@angular/core';
import MunicipalitiesLayer from '@map-wrapper/municipalities-layer';
import MunicipalityService from '@map-wrapper/service/municipality.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LayersService {
  private municipalitiesLayer: MunicipalitiesLayer;

  constructor(private municipalitiesService: MunicipalityService) {

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

  // getAdministrativeCenters(): Observable<AdministrativeCentersLayer> {
  //
  // }
}
