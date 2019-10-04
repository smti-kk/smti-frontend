import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import MunicipalityService from '../shared/services/municipality.serivice';
import { HttpClientModule } from '@angular/common/http';
import { MunicipalityDirective } from './municipality.directive';


@NgModule({
  declarations: [
    MunicipalityDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [MunicipalityService],
  exports: [MunicipalityDirective]
})
export class MunicipalityLayerModule {
}
