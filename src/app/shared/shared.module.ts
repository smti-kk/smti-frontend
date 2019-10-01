import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import MunicipalityService from './services/municipality.serivice';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    MunicipalityService
  ],
  exports: [
  ]
})
export class SharedModule { }
