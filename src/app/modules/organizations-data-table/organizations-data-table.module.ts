import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsDataComponent } from './organizations-data/organizations-data.component';
import {OrganizationsDataTableRoutingModule} from './organizations-data-table-routing.module';



@NgModule({
  declarations: [OrganizationsDataComponent],
  imports: [
    OrganizationsDataTableRoutingModule,
    CommonModule
  ]
})
export class OrganizationsDataTableModule { }
