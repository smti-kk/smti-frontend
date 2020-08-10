import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapPage} from './map-page/map-page';
import {LocationsPage} from './locations-page/locations-page';
import {FeaturesPage} from './features-page/features-page';
import {OrganizationsPage} from './organizations-page/organizations-page';
import {ContractsPage} from './contracts-page/contracts-page';
import {LocationPage} from './locations-page/location-page/location-page';
import {UsersPage} from './users/users-page';
import {PlanPage} from './locations-page/plan-page/PlanPage';
import {BaseStationsComponent} from './base-stations/base-stations.component';
import {TrunkChannelsComponent} from './trunk-channels/trunk-channels.component';
import {RouteProxyService} from './route.proxy.service';
import {MunRequestsComponent} from './mun-requests/mun-requests.component';
import {OperProfileComponent} from "./oper-profile/oper-profile.component";


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
    path: 'base-stations',
    component: BaseStationsComponent,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR'],
    },
  },
  {
    path: 'trunk-channels',
    component: TrunkChannelsComponent,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR'],
    },
  },
  {
    path: 'locations',
    component: LocationsPage,
  },
  {
    path: 'locations/:id',
    component: LocationPage,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR'],
    },
  },
  {
    path: 'locations/:id/plan',
    component: PlanPage
  },
  {
    path: 'features',
    component: FeaturesPage,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR', 'ORGANIZATION', 'MUNICIPALITY']
    },
  },
  {
    path: 'organizations',
    component: OrganizationsPage,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR', 'ORGANIZATION']
    },
  },
  {
    path: 'users',
    component: UsersPage,
    canActivate: [RouteProxyService],
    data: {
      title: 'Список пользователей в системе',
      permissions: ['ADMIN']
    },
  },
  {
    path: 'communication-contracts',
    loadChildren: () => import('./old/communication-contracts/communication-contracts.module')
      .then(module => module.CommunicationContractsModule),
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR', 'ORGANIZATION']
    },
  },
  {
    path: 'connection-points',
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR', 'ORGANIZATION']
    },
    loadChildren: () => import('./old/connection-points/connection-points.module')
      .then(module => module.ConnectionPointsModule),
  },
  {
    path: 'mun-requests',
    canActivate: [RouteProxyService],
    data: {
      permissions: ['MUNICIPALITY']
    },
    component: MunRequestsComponent
  },
  {
    path: 'oper-profile',
    canActivate: [RouteProxyService],
    data: {
      permissions: ['OPERATOR']
    },
    component: OperProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteProxyService]
})
export class AppRoutingModule {
}
