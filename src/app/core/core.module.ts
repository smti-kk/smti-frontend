import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {NotFoundPage} from './pages/not-found/not-found.page';
import {AuthorizationComponent} from './pages/authorization/authorization.component';
import {ReactiveFormsModule} from '@angular/forms';
import {
  AuthService,
  EnumService,
  GovernmentProgramService,
  OrganizationsService,
} from '@core/services';
import {StoreService} from '@core/services/store.service';
import {FilterTcPivotsService, TcPivotsService} from '@core/services/tc-pivots.service';
import {LocationFeaturesService} from '@core/services/location-features.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '@core/interceptor/auth.interceptor';
import {LocationServiceWithFilterParams, LocationService} from '@core/services/location.service';
import {AdministrativeCentersService} from '@map-wrapper/service/administrative-centers.service';
import {InternetAccessTypeService} from './services/internet-access-type.service';

@NgModule({
  declarations: [NotFoundPage, AuthorizationComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  providers: [
    AuthService,
    EnumService,
    StoreService,
    GovernmentProgramService,
    OrganizationsService,
    LocationFeaturesService,
    InternetAccessTypeService,
    TcPivotsService,
    LocationService,
    LocationServiceWithFilterParams,
    AdministrativeCentersService,
    {provide: FilterTcPivotsService, useClass: FilterTcPivotsService},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  exports: [],
})
export class CoreModule {}
