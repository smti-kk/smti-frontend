import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {RouteReuseStrategy} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  NgZorroAntdModule,
  NzAutocompleteModule,
  NzDropDownModule,
  NzNotificationModule,
} from 'ng-zorro-antd';

import {CoreModule} from '@core/core.module';
import {SharedModule} from '@shared/shared.module';
import {CustomReuseStrategy} from '@core/utils/custom-reuse-strategy';
import {GlobalErrorHandler} from '@core/utils/global-error-handler';
import {NotificationService} from '@core/services/notification.service';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

const ZN_ZORRO = [NgZorroAntdModule, NzDropDownModule, NzNotificationModule, NzAutocompleteModule];

import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
registerLocaleData(ru);

import { NZ_I18N, ru_RU } from 'ng-zorro-antd/i18n';

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
    {provide: NZ_I18N, useValue: ru_RU}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
