import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NotFoundPage } from './pages/not-found/not-found.page';

@NgModule({
  declarations: [
    NotFoundPage
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
  ]
})
export class CoreModule {
}
