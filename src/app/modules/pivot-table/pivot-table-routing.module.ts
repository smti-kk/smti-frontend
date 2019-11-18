import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PivotTablePageComponent } from './components/pivot-table-page-component/pivot-table-page-component';


const routes: Routes = [
  {
    path: '',
    component: PivotTablePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class PivotTableRoutingModule {
}
