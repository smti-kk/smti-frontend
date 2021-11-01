import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '@core/core.module';
import {SharedModule} from '@shared/shared.module';
import {
  NzAutocompleteModule,
  NzButtonModule,
  NzCheckboxModule,
  NzDatePickerModule,
  NzDrawerModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzModalModule,
  NzSelectModule,
  NzTimelineModule
} from 'ng-zorro-antd';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ConnectionPointsComponent} from './connection-points/connection-points.component';
import {SearchAddressComponent} from './connection-points/search-address/search-address.component';
import {CustomSubmitDirective} from './directives/custom-submit.directive';
import {OrganizationDetailComponent} from './organization-detail/organization-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ConnectionPointsComponent,
  },
  {
    path: 'new',
    component: OrganizationDetailComponent,
  },
  {
    path: ':id',
    component: OrganizationDetailComponent,
  },
];

@NgModule({
  declarations: [
    ConnectionPointsComponent,
    OrganizationDetailComponent,
    SearchAddressComponent,
    CustomSubmitDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NzTimelineModule,
    NzIconModule,
    NzFormModule,
    NzDrawerModule,
    NzInputModule,
    NzAutocompleteModule,
    FormsModule,
    NzSelectModule,
    NzDatePickerModule,
    CoreModule,
    NzCheckboxModule,
    NzButtonModule,
    NzModalModule,
    InfiniteScrollModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule,
    ScrollingModule,
  ],
  providers: [],
})
export class ConnectionPointsModule {}
