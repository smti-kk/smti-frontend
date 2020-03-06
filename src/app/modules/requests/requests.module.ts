import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from '@shared/shared.module';

import {RequestsComponent} from './requests.component';
import {RequestsRoutingModule} from './requests-routing.module';
import {RequestComponent} from './components/request/request.component';
import {RequestsService} from './service/requests.service';
import {InternetClarificationComponent} from './components/internet-clarification/internet-clarification.component';

@NgModule({
  declarations: [RequestsComponent, RequestComponent, InternetClarificationComponent],
  imports: [SharedModule, RequestsRoutingModule, CommonModule, ReactiveFormsModule],
  providers: [RequestsService],
  bootstrap: [RequestsComponent],
})
export class RequestsModule {}
