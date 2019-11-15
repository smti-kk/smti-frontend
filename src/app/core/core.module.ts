import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NotFoundPage,
    AuthorizationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
  ]
})
export class CoreModule {
}
