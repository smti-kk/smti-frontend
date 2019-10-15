import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import AccessPointsService from './service/access-points.service';
import { HttpClientModule } from '@angular/common/http';
import { AccessPointSmoLayer } from './access-point-smo-layer';
import { AccessPointEspdLayer } from './access-point-espd-layer';
import { AdministrativeCentersLayer } from './administrative-centers-layer';
import MunicipalityService from './service/municipality.service';
import { LayersService } from '@map-wrapper/service/layers.service';


@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AccessPointsService,
    AccessPointEspdLayer,
    AccessPointSmoLayer,
    AdministrativeCentersLayer,
    MunicipalityService,
    LayersService
  ]
})
export class MapWrapperModule {
}
