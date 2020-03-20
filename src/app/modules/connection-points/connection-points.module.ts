import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NgxSpinnerModule} from 'ngx-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {
    NzAutocompleteModule,
    NzDrawerModule,
    NzFormModule,
    NzIconModule,
    NzInputModule, NzSelectModule,
    NzTimelineModule
} from 'ng-zorro-antd';

import {SharedModule} from '@shared/shared.module';

import {ConnectionPointsComponent} from './connection-points/connection-points.component';
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
    ],
})
export class ConnectionPointsModule {}
