import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {RouteReuseStrategy} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from '@core/core.module';
import {SharedModule} from '@shared/shared.module';
import {CustomReuseStrategy} from '@core/utils/custom-reuse-strategy';
import {GlobalErrorHandler} from '@core/utils/global-error-handler';
import {
  NgZorroAntdModule,
  NzAutocompleteModule,
  NzDropDownModule,
  NzNotificationModule,
} from 'ng-zorro-antd';
import {NotificationService} from '@core/services/notification.service';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

const ZN_ZORRO = [NgZorroAntdModule, NzDropDownModule, NzNotificationModule, NzAutocompleteModule];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    ...ZN_ZORRO,
  ],
  providers: [
    NotificationService,
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy},
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
