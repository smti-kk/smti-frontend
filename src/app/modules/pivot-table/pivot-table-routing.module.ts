import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PivotTablePageComponent} from './components/pivot-table-page-component/pivot-table-page-component';
import {TechnicalCapabilitiesComponent} from './components/technical-capabilities/technical-capabilities.component';

const routes: Routes = [
  {
    path: '',
    component: PivotTablePageComponent,
  },
  {
    path: ':id',
    component: TechnicalCapabilitiesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class PivotTableRoutingModule {}
