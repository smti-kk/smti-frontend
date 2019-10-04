import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import AccessPointsService from './service/access-points.service';
import { HttpClientModule } from '@angular/common/http';
import { AccessPointSmoLayerDirective } from './access-point-smo-layer.directive';
import { AccessPointEspdLayerDirective } from './access-point-espd-layer.directive';
import { AdministrativeCentersLayerDirective } from './administrative-centers-layer.directive';


@NgModule({
  declarations: [
    AccessPointEspdLayerDirective,
    AccessPointSmoLayerDirective,
    AdministrativeCentersLayerDirective
  ],
  exports: [
    AccessPointEspdLayerDirective,
    AccessPointSmoLayerDirective,
    AdministrativeCentersLayerDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [AccessPointsService]
})
export class PointLayersModule {
}
