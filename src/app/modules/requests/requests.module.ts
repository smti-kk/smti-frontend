import { NgModule } from '@angular/core';
import { RequestsComponent } from './requests.component';
import { SharedModule } from '../../shared/shared.module';
import { RequestsRoutingModule } from './requests-routing.module';
import { RequestComponent } from './components/request/request.component';
import { CommonModule } from '@angular/common';
import { RequestsService } from './service/requests.service';
import { InternetClarificationComponent } from './components/internet-clarification/internet-clarification.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RequestsComponent,
    RequestComponent,
    InternetClarificationComponent
  ],
  imports: [
    SharedModule,
    RequestsRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    RequestsService
  ],
  bootstrap: [RequestsComponent]
})
export class RequestsModule {
}
