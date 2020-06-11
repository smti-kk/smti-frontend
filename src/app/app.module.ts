import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {RouteReuseStrategy} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  NgZorroAntdModule,
  NZ_CONFIG,
  NzAutocompleteModule,
  NzConfig,
  NzDropDownModule,
  NzNotificationModule,
} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import ru from '@angular/common/locales/ru';
import {NZ_I18N, ru_RU} from 'ng-zorro-antd/i18n';

import {CoreModule} from '@core/core.module';
import {SharedModule} from '@shared/shared.module';
import {CustomReuseStrategy} from '@core/utils/custom-reuse-strategy';
import {GlobalErrorHandler} from '@core/utils/global-error-handler';
import {NotificationService} from '@core/services/notification.service';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FormOrganizationComponent} from '@shared/components/form-organization/form-organization.component';
import {FormAccessPointComponent} from '@shared/components/form-access-point/form-access-point.component';


const ZN_ZORRO = [NgZorroAntdModule, NzDropDownModule, NzNotificationModule, NzAutocompleteModule];
registerLocaleData(ru);

const ngZorroConfig: NzConfig = {
  notification: {
    nzPlacement: 'bottomLeft',
    nzMaxStack: 3,
  }
}

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
    {provide: NZ_I18N, useValue: ru_RU},
    {provide: NZ_CONFIG, useValue: ngZorroConfig}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FormOrganizationComponent,
    FormAccessPointComponent
  ],
})
export class AppModule {}
