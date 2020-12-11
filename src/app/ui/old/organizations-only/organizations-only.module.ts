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

import {OrganizationsOnlyComponent} from './organizations-only/organizations-only.component';
import {OrganizationOnlyDetailComponent} from './organization-only-detail/organization-only-detail.component';
import {CoreModule} from '@core/core.module';
import {MatSelectModule} from "@angular/material/select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";

const routes: Routes = [
  {
    path: '',
    component: OrganizationsOnlyComponent,
  },
  {
    path: 'new',
    component: OrganizationOnlyDetailComponent,
  },
  {
    path: ':id',
    component: OrganizationOnlyDetailComponent,
  },
];

@NgModule({
  declarations: [OrganizationsOnlyComponent, OrganizationOnlyDetailComponent],
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
    MatSelectModule,
    NgxMatSelectSearchModule
  ],
  providers: [],
})
export class OrganizationsOnlyModule {}
