import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapPage} from './map-page/map-page';
import {LocationsPage} from './locations-page/locations-page';
import {FeaturesPage} from './features-page/features-page';
import {OrganizationsPage} from './organizations-page/organizations-page';
import {ContractsPage} from './contracts-page/contracts-page';
import {LocationPage} from './locations-page/location-page/location-page';
import {UsersPage} from './users/users-page';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
  {
    path: 'map',
    component: MapPage
  },
  {
    path: 'locations',
    component: LocationsPage,
  },
  {
    path: 'locations/:id',
    component: LocationPage
  },
  {
    path: 'features',
    component: FeaturesPage
  },
  {
    path: 'organizations',
    component: OrganizationsPage
  },
  {
    path: 'contracts',
    component: ContractsPage
  },
  {
    path: 'users',
    component: UsersPage,
    data: {title: 'Список пользователей в системе'}
  },
  {
    path: 'communication-contracts',
    loadChildren: () => import('./old/communication-contracts/communication-contracts.module')
      .then(module => module.CommunicationContractsModule),
  },
  {
    path: 'connection-points',
    loadChildren: () => import('./old/connection-points/connection-points.module')
      .then(module => module.ConnectionPointsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
