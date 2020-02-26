import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConnectionPointsComponent} from './connection-points/connection-points.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '@shared/shared.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {OrganizationDetailComponent} from './organization-detail/organization-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ConnectionPointsComponent,
  },
  {
    path: 'new',
    component: OrganizationDetailComponent
  },
  {
    path: ':id',
    component: OrganizationDetailComponent,
  }
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
  ],
})
export class ConnectionPointsModule {}
