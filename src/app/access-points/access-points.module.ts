import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessPointsDirective } from './access-points.directive';
import AccessPointsService from './service/access-points.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AccessPointsDirective],
  exports: [
    AccessPointsDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [AccessPointsService]
})
export class AccessPointsModule { }
