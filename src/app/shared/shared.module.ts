import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrganizationsService } from './services/organizations.service';
import { StoreService } from './services/store.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [OrganizationsService, StoreService],
  exports: []
})
export class SharedModule {
}
