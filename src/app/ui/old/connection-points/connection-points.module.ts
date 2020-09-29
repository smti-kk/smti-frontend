import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NgxSpinnerModule} from 'ngx-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {
  NzAutocompleteModule, NzButtonModule, NzCheckboxModule, NzDatePickerModule,
  NzDrawerModule,
  NzFormModule,
  NzIconModule,
  NzInputModule, NzModalModule, NzSelectModule,
  NzTimelineModule,
} from 'ng-zorro-antd';

import {SharedModule} from '@shared/shared.module';

import {ConnectionPointsComponent} from './connection-points/connection-points.component';
import {OrganizationDetailComponent} from './organization-detail/organization-detail.component';
import {CoreModule} from '@core/core.module';
import {MatButtonModule} from '@angular/material/button';

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
  declarations: [ConnectionPointsComponent, OrganizationDetailComponent],
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
    MatButtonModule
  ],
  providers: [],
})
export class ConnectionPointsModule {}
