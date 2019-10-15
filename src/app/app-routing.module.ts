import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapPage } from './core/pages/map-page/map.page';


const routes: Routes = [
  {path: '', component: MapPage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
