import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Menu} from './menu/menu';
import {MapPage} from './map-page/map-page';
import {Search} from './map-page/search/search';
import {LocationInfoBar} from './map-page/location-info-bar/LocationInfoBar';
import {OrganizationsInfoBar} from './map-page/organizations-info-bar/organizations-info-bar';
import {BestMap} from './map-page/map/BestMap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LocationsPage} from './locations-page/locations-page';
import {ServiceModule} from '@service/service.module';
import {Authorization} from './authorization/authorization';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PermissionsDirective} from './directives/permissions.directive';
import {FeaturesPage} from './features-page/features-page';
import {OrganizationsPage} from './organizations-page/organizations-page';
import {ContractsPage} from './contracts-page/contracts-page';
import {LocationFiltersComponent} from './locations-page/location-filters/location-filters.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {InfoBar} from './map-page/info-bar/InfoBar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MatSelectModule} from '@angular/material/select';
import {OrganizationFilters} from './organizations-page/organization-filters/OrganizationFilters';
import {Loader} from './loader/Loader';
import {LoaderService} from './loader/LoaderService';
import {LoaderServiceImpl} from './loader/LoaderServiceImpl';
import {NgSelectModule} from '@ng-select/ng-select';
import {UsersPage} from './users/users-page';
import {JoinPipe} from './users/pipe/join.pipe';
import {HttpClientModule} from '@angular/common/http';
import {NZ_I18N, ru_RU} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import ru from '@angular/common/locales/ru';
import {LocationPage} from './locations-page/location-page/location-page';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {SelectorsModule} from './selectors/SelectorsModule';
import {ThreeStateButton} from './buttons/three-state-button/ThreeStateButton';
import {FilterBtnComponent} from './buttons/filter-btn/filter-btn.component';
import {MatIconModule} from '@angular/material/icon';
import {SignalControl} from './buttons/signal-control/SignalControl';
import {PlanPage} from './locations-page/plan-page/PlanPage';
import {MoveToArchiveDialog} from './features-page/move-to-archive-dialog/MoveToArchiveDialog';
import { BaseStationsComponent } from './base-stations/base-stations.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CreateBaseStationComponent } from './base-stations/create-base-station/create-base-station.component';
import {DialogsModule} from './dialogs/dialogs.module';
import { TrunkChannelsComponent } from './trunk-channels/trunk-channels.component';
import { CreateTrunkChannelComponent } from './trunk-channels/create-trunk-channel/create-trunk-channel.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AreaInfoBarComponent } from './map-page/area-info-bar/area-info-bar.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

registerLocaleData(ru);

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
    Authorization,
    PermissionsDirective,
    FeaturesPage,
    OrganizationsPage,
    ContractsPage,
    InfoBar,
    UsersPage,
    LocationFiltersComponent,
    OrganizationFilters,
    Loader,
    JoinPipe,
    Loader,
    LocationPage,
    ThreeStateButton,
    FilterBtnComponent,
    SignalControl,
    PlanPage,
    MoveToArchiveDialog,
    BaseStationsComponent,
    CreateBaseStationComponent,
    TrunkChannelsComponent,
    CreateTrunkChannelComponent,
    AreaInfoBarComponent,
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
    MatNativeDateModule
  ],
  providers: [
    {
      provide: LoaderService,
      useClass: LoaderServiceImpl
    },
    {provide: NZ_I18N, useValue: ru_RU}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
