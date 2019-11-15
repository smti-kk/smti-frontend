import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from './core/pages/not-found/not-found.page';
import { AuthorizationComponent } from './core/pages/authorization/authorization.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: './map-wrapper/map-wrapper.module#MapWrapperModule',
    data: {key: 'leaflet'}
  },
  {
    path: 'user/requests',
    loadChildren: './requests/requests.module#RequestsModule'
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
