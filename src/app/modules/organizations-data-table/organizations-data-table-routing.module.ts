import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {OrganizationsDataComponent} from "./organizations-data/organizations-data.component";

const routes: Routes = [
  {
    path: '',
    component: OrganizationsDataComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrganizationsDataTableRoutingModule {
}
