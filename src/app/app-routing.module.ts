import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from './core/pages/not-found/not-found.page';


const routes: Routes = [
  {
    path: '',
    loadChildren: './map-wrapper/map-wrapper.module#MapWrapperModule'
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
