import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {OrganizationService} from '@service/organizations/OrganizationService';
import {OrganizationServiceImpl} from '@service/organizations/OrganizationServiceImpl';
import {factory} from '@service/initialize';

const services = factory();

@NgModule({
  providers: [
    {
      provide: OrganizationService,
      useFactory: () => {
        return new OrganizationServiceImpl();
      },
      deps: [HttpClient]
    },
    ...services
  ],
  imports: [
    HttpClientModule
  ]
})
export class ServiceModule {

}
