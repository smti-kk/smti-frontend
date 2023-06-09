import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, Injector, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Menu } from './menu/menu';
import { MapPage } from './map-page/map-page';
import { Search } from './map-page/search/search';
import { LocationInfoBar } from './map-page/location-info-bar/LocationInfoBar';
import { OrganizationsInfoBar } from './map-page/organizations-info-bar/organizations-info-bar';
import { BestMap } from './map-page/map/BestMap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LocationsPage } from './locations-page/locations-page';
import { LocationsPageDesktop } from './locations-page/locations-page-desktop/locations-page-desktop';
import { ServiceModule } from '@service/service.module';
import { Authorization } from './authorization/authorization';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesPage } from './features-page/features-page';
import { OrganizationsPage } from './organizations-page/organizations-page';
import { ContractsPage } from './contracts-page/contracts-page';
import { LocationFiltersComponent } from './locations-page/location-filters/location-filters.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InfoBar } from './map-page/info-bar/InfoBar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatSelectModule } from '@angular/material/select';
import { OrganizationFilters } from './organizations-page/organization-filters/OrganizationFilters';
import { Loader } from './loader/Loader';
import { LoaderService } from './loader/LoaderService';
import { LoaderServiceImpl } from './loader/LoaderServiceImpl';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsersPage } from './users/users-page';
import { JoinPipe } from './users/pipe/join.pipe';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NZ_I18N, ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import {LocationPage} from './locations-page/location-page/location-page';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {SelectorsModule} from './selectors/SelectorsModule';
import {ThreeStateButton} from './buttons/three-state-button/ThreeStateButton';
import {FourStateButton} from './buttons/four-state-button/FourStateButton';
import {FilterBtnComponent} from './buttons/filter-btn/filter-btn.component';
import {MatIconModule} from '@angular/material/icon';
import {SignalControl} from './buttons/signal-control/SignalControl';
import {PlanPage} from './locations-page/plan-page/PlanPage';
import {MoveToArchiveDialog} from './features-page/move-to-archive-dialog/MoveToArchiveDialog';
import {BaseStationsComponent} from './base-stations/base-stations.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CreateBaseStationComponent} from './base-stations/create-base-station/create-base-station.component';
import {DialogsModule} from './dialogs/dialogs.module';
import {TrunkChannelsComponent} from './trunk-channels/trunk-channels.component';
import {CreateTrunkChannelComponent} from './trunk-channels/create-trunk-channel/create-trunk-channel.component';
import {MatTabsModule} from '@angular/material/tabs';
import {AreaInfoBarComponent} from './map-page/area-info-bar/area-info-bar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {GlobalErrorHandler} from './global-error-handler';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MunRequestsComponent} from './mun-requests/mun-requests.component';
import {MunRequestComponent} from './mun-requests/mun-request/mun-request.component';
import {OperProfileComponent} from './oper-profile/oper-profile.component';
import {ReqDeclineFormComponent} from './oper-profile/req-decline-form/req-decline-form.component';
import {PointTypePipe} from './map-page/pipes/point-type.pipe';
import {ImportLocationComponent} from './import-location/import-location.component';
import {ImportTcInternetComponent} from './import-tc-internet/import-tc-internet.component';
import {ImportTcMobileComponent} from './import-tc-mobile/import-tc-mobile.component';
import {ImportTcPayphoneComponent} from './import-tc-payphone/import-tc-payphone.component';
import {ImportTcPostComponent} from './import-tc-post/import-tc-post.component';
import {ImportTcRadioComponent} from './import-tc-radio/import-tc-radio.component';
import {ImportTcTvComponent} from './import-tc-tv/import-tc-tv.component';
import {ImportAccessPointComponent} from './import-access-point/import-access-point.component';
import {ImportTcAtsComponent} from './import-tc-ats/import-tc-ats.component';
import {ImportTcInfomatComponent} from './import-tc-infomat/import-tc-infomat.component';
import {ImportTrunkChannelComponent} from './import-trunk-channel/import-trunk-channel.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {AreaSelectComponent} from './selectors/area-select/area-select.component';
import {StorageService} from '../storage/storage.service';
import {LocalStorageService} from '../storage/local-storage.service';
import {AuthInterceptor} from '@api/auth.interceptor';
import {LocationComparingFiltersComponent} from './features-page/location-comparing-filters/location-comparing-filters.component';
import {BaseStationInfoBarComponent} from './map-page/base-station-info-bar/base-station-info-bar.component';
import {ReportMonitoringComponent} from './report-monitoring/report-monitoring.component';
import {JoinorgPipe} from './users/pipe-organizations/joinorg.pipe';
import {ImportBaseStationComponent} from './import-base-station/import-base-station.component';
import {AppealComponent} from './appeal/appeal.component';
import {CreateAppealComponent} from './appeal/create-appeal/create-appeal.component';
import {MatFileUploadModule} from 'mat-file-upload';
import {OperatorsComponent} from './operators/operators.component';
import {CreateOperatorsComponent} from './operators/create-operators/create-operators.component';
import {FormCreateUserComponent} from './users/form-create-user/form-create-user.component';
import {BaseStationsFiltersComponent} from './base-stations/base-stations-filters/base-stations-filters.component';
import {FormResetPasswordComponent} from './users/form-reset-password/form-reset-password.component';
import {TypeOrganizationComponent} from './type-organization/type-organization.component';
import {CreateTypeOrganizationComponent} from './type-organization/create/create-type-organization.component';
import {TypeSmoComponent} from './type-smo/type-smo.component';
import {CreateTypeSmoComponent} from './type-smo/create/create-type-smo.component';
import {GovProgramComponent} from './gov-programs/gov-program.component';
import {CreateGovProgramComponent} from './gov-programs/create/create-gov-program.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {LocationServiceOrganizationAccessPointsWithFilterParams} from "@core/services/location.service";
import {ObserverDirective} from "./directives/observer.directive";
import {SortDirective} from "./directives/sort.directive";
import {CoreModule} from "@core/core.module";
import {SharedModule} from "@shared/shared.module";
import {JournalComponent} from "./journal/journal.component";
import {NzDatePickerModule, NzFormModule, NzToolTipModule} from "ng-zorro-antd";
import {MunRequestsArchiveComponent} from './mun-requests/mun-requests-archive/mun-requests-archive.component';
import {MunRequestsFiltersComponent} from './mun-requests/mun-requests-filters/mun-requests-filters.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NotificationListComponent} from './notification-list/notification-list.component';
import {ToastrModule} from 'ngx-toastr';
import {FormEditLocationComponent} from './old/locations-book/components/form-edit-location/form-edit-location.component';
import {MunicipalityAreaBookPageComponent } from './old/locations-book/pages/municipality-area-book-page/municipality-area-book-page.component';
import { LocalityBookPageComponent} from './old/locations-book/pages/locality-book-page/locality-book.component';
import {LocationsGeoModalComponent} from 'src/app/ui/old/locations-book/components/locations-geo-modal/locations-geo-modal.component';
import {LocationsBookFilterComponent} from './old/locations-book/components/locations-book-filter/locations-book-filter.component';
import {MatPaginatorIntl } from "@angular/material/paginator";
import {MatCustomPaginatorIntl} from './old/shared/components/mate-paginator-intl/mat-paginator-intl';
import {LocationsPageMobile} from './locations-page/locations-page-mobile/locations-page-mobile'
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {NZ_ICONS, NzIconModule} from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { LocationsFilterMobileComponent } from './locations-page/locations-filter-mobile/locations-filter-mobile.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { FunCustomerComponent } from './fun-customer/fun-customer.component';
import { FunCustomerViewComponent } from './fun-customer/fun-customer-view/fun-customer-view.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
registerLocaleData(ru);

const toastrConfig = {
  positionClass: 'toast-bottom-right',
  maxOpened: 3,
};

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent,
    Menu,
    MapPage,
    Search,
    LocationInfoBar,
    OrganizationsInfoBar,
    BestMap,
    LocationsPage,
    LocationsPageDesktop,
    Authorization,
    FeaturesPage,
    OrganizationsPage,
    ContractsPage,
    InfoBar,
    UsersPage,
    LocationFiltersComponent,
    OrganizationFilters,
    Loader,
    JoinPipe,
    JoinorgPipe,
    Loader,
    LocationPage,
    ThreeStateButton,
    FourStateButton,
    FilterBtnComponent,
    SignalControl,
    PlanPage,
    MoveToArchiveDialog,
    BaseStationsComponent,
    CreateBaseStationComponent,
    TrunkChannelsComponent,
    CreateTrunkChannelComponent,
    AreaInfoBarComponent,
    MunRequestsComponent,
    MunRequestComponent,
    OperProfileComponent,
    ReqDeclineFormComponent,
    PointTypePipe,
    ImportLocationComponent,
    ImportTcInternetComponent,
    ImportTcMobileComponent,
    ImportTcPayphoneComponent,
    ImportTcPostComponent,
    ImportTcRadioComponent,
    ImportTcTvComponent,
    ImportAccessPointComponent,
    ImportTcAtsComponent,
    ImportTcInfomatComponent,
    ImportTrunkChannelComponent,
    ImportBaseStationComponent,
    AreaSelectComponent,
    LocationComparingFiltersComponent,
    BaseStationInfoBarComponent,
    ReportMonitoringComponent,
    AppealComponent,
    CreateAppealComponent,
    OperatorsComponent,
    JournalComponent,
    CreateOperatorsComponent,
    CreateAppealComponent,
    FormCreateUserComponent,
    BaseStationsFiltersComponent,
    TypeOrganizationComponent,
    FormResetPasswordComponent,
    CreateTypeOrganizationComponent,
    TypeSmoComponent,
    CreateTypeSmoComponent,
    GovProgramComponent,
    CreateGovProgramComponent,
    ObserverDirective,
    SortDirective,
    MunRequestsArchiveComponent,
    MunRequestsFiltersComponent,
    NotificationListComponent,
    FormEditLocationComponent,
    LocalityBookPageComponent,
    LocationsGeoModalComponent,
    MunicipalityAreaBookPageComponent,
    LocationsBookFilterComponent,
    LocationsPageMobile,
    LocationsFilterMobileComponent,
    FunCustomerComponent,
    FunCustomerViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatExpansionModule,
    LeafletModule,
    ServiceModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    InfiniteScrollModule,
    MatSelectModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatRadioModule,
    SelectorsModule,
    MatIconModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    DialogsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatMenuModule,
    NgxMatSelectSearchModule,
    MatFileUploadModule,
    ScrollingModule,
    CoreModule,
    SharedModule,
    NzFormModule,
    NzDatePickerModule,
    ToastrModule.forRoot(toastrConfig),
    NzCollapseModule,
    NzIconModule,
    NzUploadModule,
    NzToolTipModule,
    NzTypographyModule,
  ],
  exports: [SortDirective, CoreModule, SharedModule],
  providers: [
    LocationServiceOrganizationAccessPointsWithFilterParams,
    {
      provide: LoaderService,
      useClass: LoaderServiceImpl,
    },
    {provide: NZ_I18N, useValue: ru_RU},
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {provide: StorageService, useClass: LocalStorageService},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {provide: MatPaginatorIntl, useValue: MatCustomPaginatorIntl()},
    {provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
