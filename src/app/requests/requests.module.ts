import { NgModule } from '@angular/core';
import { RequestsComponent } from './requests.component';
import { SharedModule } from '../shared/shared.module';
import { RequestsRoutingModule } from './requests-routing.module';

@NgModule({
  declarations: [
    RequestsComponent
  ],
  imports: [
    SharedModule,
    RequestsRoutingModule
  ],
  providers: [],
  bootstrap: [RequestsComponent]
})
export class RequestsModule {
}
