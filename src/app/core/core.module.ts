import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from '@core/interceptor/auth.interceptor';
import {
  AuthService,
  EnumService,
  GovernmentProgramService,
  OrganizationsService,
} from '@core/services';
import {LocationFeaturesService} from '@core/services/location-features.service';
import {
  LocationServiceContractsWithFilterParams,
  LocationServiceOrganizationAccessPointsWithFilterParams,
} from '@core/services/location.service';
import {StoreService} from '@core/services/store.service';
import {TcPivotsService} from '@core/services/tc-pivots.service';
import {AdministrativeCentersService} from '@map-wrapper/service/administrative-centers.service';
import {SharedModule} from '@shared/shared.module';
import {AuthorizationComponent} from './pages/authorization/authorization.component';
import {NotFoundPage} from './pages/not-found/not-found.page';
import {InternetAccessTypeService} from './services/internet-access-type.service';
import { FilterTcPivotsService } from '@core/services/filter-tc-pivots.service';

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
    LocationServiceContractsWithFilterParams,
    LocationServiceOrganizationAccessPointsWithFilterParams,
    AdministrativeCentersService,
    {provide: FilterTcPivotsService, useClass: FilterTcPivotsService},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  exports: [],
})
export class CoreModule {}
