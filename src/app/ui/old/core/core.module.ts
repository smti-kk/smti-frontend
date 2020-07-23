import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {GovernmentProgramService, OrganizationsService} from '@core/services';
import {LocationFeaturesService} from '@core/services/location-features.service';
import {
  LocationService,
  LocationServiceContractsWithFilterParams,
  LocationServiceOrganizationAccessPointsWithFilterParams,
} from '@core/services/location.service';
import {StoreService} from '@core/services/store.service';
import {TcPivotsService} from '@core/services/tc-pivots.service';
import {SharedModule} from '@shared/shared.module';

import {InternetAccessTypeService} from './services/internet-access-type.service';
import {AuthInterceptor} from '../../../api/auth.interceptor';
import {LocalStorageService} from '../../../storage/local-storage.service';
import {AccessPointTypeService} from './services/accesspoint-type.service';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  providers: [
    StoreService,
    GovernmentProgramService,
    OrganizationsService,
    LocationFeaturesService,
    InternetAccessTypeService,
    TcPivotsService,
    LocationService,
    LocationServiceContractsWithFilterParams,
    LocationServiceOrganizationAccessPointsWithFilterParams,
    AccessPointTypeService,
    NgZorroAntdModule,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: () => new AuthInterceptor(
        new LocalStorageService()
      ),
      multi: true
    },
  ],

  exports: [],
})
export class CoreModule {
}
