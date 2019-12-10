import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CommunicationContractsComponent } from './communication-contracts/communication-contracts.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
    path: '',
    component: CommunicationContractsComponent
  }
];

@NgModule({
  declarations: [CommunicationContractsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CoreModule,
    NgxSpinnerModule
  ]
})
export class CommunicationContractsModule {
}