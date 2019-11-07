import { Component, OnInit } from '@angular/core';
import { RequestsService } from './service/requests.service';
import { Request } from './model/request';
import { LocationCapabilitiesService } from '../shared/services/location-capabilities.service';
import { LocationCapabilities } from '../shared/models/location-capabilities';

@Component({
  selector: 'requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  requests: Request[];
  technicalCapability: LocationCapabilities;

  constructor(private requestsService: RequestsService, private technicalCapabilitiesService: LocationCapabilitiesService) {
  }

  ngOnInit(): void {
    this.requestsService.requestsList().subscribe(requests => {
      this.requests = requests;
    });

    // tslint:disable-next-line:no-magic-numbers
    this.technicalCapabilitiesService.get(2419, false).subscribe(technicalCapability => {
      this.technicalCapability = technicalCapability;
    });
  }


}
