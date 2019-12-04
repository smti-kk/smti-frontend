import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { RouteReuseStrategy } from '@angular/router';
import {CustomReuseStrategy} from '@core/utils/custom-reuse-strategy';
import {GlobalErrorHandler} from '@core/utils/global-error-handler';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy},
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
