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
import { Authorization } from './authorization/authorization';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {PermissionsDirective} from './directives/permissions.directive';
import { FeaturesPage } from './features-page/features-page';
import { OrganizationsPage } from './organizations-page/organizations-page';
import { ContractsPage } from './contracts-page/contracts-page';
import { LocationFiltersComponent } from './locations-page/location-filters/location-filters.component';
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
import { UsersPage } from './users/users-page';
import { JoinPipe } from './users/pipe/join.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import {LocationPage} from './locations-page/location-page/location-page';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {SelectorsModule} from './selectors/SelectorsModule';

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
    LocationPage
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
    SelectorsModule
  ],
  providers: [
    {
      provide: LoaderService,
      useClass: LoaderServiceImpl
    },
    { provide: NZ_I18N, useValue: ru_RU }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
