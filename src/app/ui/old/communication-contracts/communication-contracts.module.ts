import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NgxSpinnerModule} from 'ngx-spinner';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CoreModule} from '@core/core.module';
import {SharedModule} from '@shared/shared.module';

import {CommunicationContractsComponent} from './communication-contracts/communication-contracts.component';
import {NzDatePickerModule, NzFormModule, NzIconModule, NzInputModule, NzModalModule, NzSelectModule} from 'ng-zorro-antd';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {MatSelectModule} from "@angular/material/select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  {
    path: '',
    component: CommunicationContractsComponent,
  },
];

@NgModule({
  declarations: [CommunicationContractsComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CoreModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzInputModule,
    NzFormModule,
    NzDatePickerModule,
    NzIconModule,
    FormsModule,
    NzModalModule,
    InfiniteScrollModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    ScrollingModule,
    MatButtonModule
  ],
})
export class CommunicationContractsModule {}
