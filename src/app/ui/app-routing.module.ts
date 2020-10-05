import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapPage} from './map-page/map-page';
import {LocationsPage} from './locations-page/locations-page';
import {FeaturesPage} from './features-page/features-page';
import {OrganizationsPage} from './organizations-page/organizations-page';
import {LocationPage} from './locations-page/location-page/location-page';
import {UsersPage} from './users/users-page';
import {PlanPage} from './locations-page/plan-page/PlanPage';
import {BaseStationsComponent} from './base-stations/base-stations.component';
import {TrunkChannelsComponent} from './trunk-channels/trunk-channels.component';
import {RouteProxyService} from './route.proxy.service';
import {MunRequestsComponent} from './mun-requests/mun-requests.component';
import {OperProfileComponent} from './oper-profile/oper-profile.component';
import {ImportLocationComponent} from './import-location/import-location.component';
import {ImportTcInternetComponent} from './import-tc-internet/import-tc-internet.component';
import {ImportTcPayphoneComponent} from './import-tc-payphone/import-tc-payphone.component';
import {ImportTcMobileComponent} from './import-tc-mobile/import-tc-mobile.component';
import {ImportTcPostComponent} from './import-tc-post/import-tc-post.component';
import {ImportTcRadioComponent} from './import-tc-radio/import-tc-radio.component';
import {ImportTcTvComponent} from './import-tc-tv/import-tc-tv.component';
import {ImportAccessPointComponent} from './import-access-point/import-access-point.component';
import {ImportTrunkChannelComponent} from './import-trunk-channel/import-trunk-channel.component';
import {ImportTcAtsComponent} from './import-tc-ats/import-tc-ats.component';
import {ImportTcInfomatComponent} from './import-tc-infomat/import-tc-infomat.component';
import { ReportMonitoringComponent } from './report-monitoring/report-monitoring.component';
import {ImportBaseStationComponent} from './import-base-station/import-base-station.component';
import {AppealComponent} from "./appeal/appeal.component";
import {OperatorsComponent} from "./operators/operators.component";


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
    path: '',
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
    path: 'organizations-only',
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR', 'ORGANIZATION']
    },
    loadChildren: () => import('./old/organizations-only/organizations-only.module')
      .then(module => module.OrganizationsOnlyModule),
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
  {
    path: 'import-location',
    component: ImportLocationComponent,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR', 'ORGANIZATION', 'MUNICIPALITY']
    },
  },
  {
    path: 'import-tc-internet',
    component: ImportTcInternetComponent,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR', 'ORGANIZATION', 'MUNICIPALITY']
    },
  },
  {
    path: 'import-tc-payphone',
    component: ImportTcPayphoneComponent,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR', 'ORGANIZATION', 'MUNICIPALITY']
    },
  },
  {
    path: 'import-tc-mobile',
    component: ImportTcMobileComponent,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR', 'ORGANIZATION', 'MUNICIPALITY']
    },
  },
  {
    path: 'import-tc-post',
    component: ImportTcPostComponent,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR', 'ORGANIZATION', 'MUNICIPALITY']
    },
  },
  {
    path: 'import-tc-radio',
    component: ImportTcRadioComponent,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR', 'ORGANIZATION', 'MUNICIPALITY']
    },
  },
  {
    path: 'import-tc-tv',
    component: ImportTcTvComponent,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR', 'ORGANIZATION', 'MUNICIPALITY']
    },
  },
  {
    path: 'import-access-point',
    component: ImportAccessPointComponent,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR', 'ORGANIZATION', 'MUNICIPALITY']
    },
  },
  {
    path: 'import-trunk-channel',
    component: ImportTrunkChannelComponent,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR', 'ORGANIZATION', 'MUNICIPALITY']
    },
  },
  {
    path: 'import-tc-ats',
    component: ImportTcAtsComponent,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR', 'ORGANIZATION', 'MUNICIPALITY']
    },
  },
  {
    path: 'import-tc-infomat',
    component: ImportTcInfomatComponent,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR', 'ORGANIZATION', 'MUNICIPALITY']
    },
  },
  {
    path: 'import-base-station',
    component: ImportBaseStationComponent,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR', 'ORGANIZATION', 'MUNICIPALITY']
    },
  },
  {
    path: 'report-monitoring',
    component: ReportMonitoringComponent,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN', 'OPERATOR']
    },
  },
  {
    path: 'appeals',
    component: AppealComponent,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN']
    },
  },
  {
    path: 'operators',
    component: OperatorsComponent,
    canActivate: [RouteProxyService],
    data: {
      permissions: ['ADMIN']
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteProxyService]
})
export class AppRoutingModule {
}
