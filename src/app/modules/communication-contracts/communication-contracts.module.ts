import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CommunicationContractsComponent} from './communication-contracts/communication-contracts.component';
import {SharedModule} from '@shared/shared.module';
import {CoreModule} from '@core/core.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {ReactiveFormsModule} from '@angular/forms';

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
  ],
})
export class CommunicationContractsModule {}
