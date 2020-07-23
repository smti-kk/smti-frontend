import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {OrganizationService} from '@service/organizations/OrganizationService';
import {OrganizationServiceImpl} from '@service/organizations/OrganizationServiceImpl';
import {factory} from '@service/initialize';

@NgModule({
  providers: [
    {
      provide: OrganizationService,
      useFactory: () => {
        return new OrganizationServiceImpl();
      },
      deps: [HttpClient]
    },
    ...factory()
  ],
  imports: [
    HttpClientModule
  ]
})
export class ServiceModule {

}
