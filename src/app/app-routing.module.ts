import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from './core/pages/not-found/not-found.page';
import { AuthorizationComponent } from './core/pages/authorization/authorization.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/map-wrapper/map-wrapper.module#MapWrapperModule',
    data: {key: 'leaflet'}
  },
  {
    path: 'user/requests',
    loadChildren: './modules/requests/requests.module#RequestsModule'
  },
  {
    path: 'pivot-table',
    loadChildren: './modules/pivot-table/pivot-table.module#PivotTableModule'
  },
  {
    path: 'authorization',
    component: AuthorizationComponent
  },
  {
    path: '**',
    component: NotFoundPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
