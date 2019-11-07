import { NgModule } from '@angular/core';
import { RequestsComponent } from './requests.component';
import { SharedModule } from '../shared/shared.module';
import { RequestsRoutingModule } from './requests-routing.module';
import { RequestComponent } from './components/request/request.component';
import { CommonModule } from '@angular/common';
import { RequestsService } from './service/requests.service';
import { InternetClarificationComponent } from './components/internet-clarification/internet-clarification.component';

@NgModule({
  declarations: [
    RequestsComponent,
    RequestComponent,
    InternetClarificationComponent
  ],
  imports: [
    SharedModule,
    RequestsRoutingModule,
    CommonModule
  ],
  providers: [
    RequestsService
  ],
  bootstrap: [RequestsComponent]
})
export class RequestsModule {
}
