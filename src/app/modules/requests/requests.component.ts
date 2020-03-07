import {Component, OnInit} from '@angular/core';
import {LocationFeatures} from '@core/models';
import {LocationFeaturesService} from '@core/services/location-features.service';

import {RequestsService} from './service/requests.service';
import {Request} from './model/request';

@Component({
  selector: 'requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  requests: Request[];

  technicalCapability: LocationFeatures;

  forms: {
    internet: boolean;
  } = {
    internet: false,
  };

  constructor(
    private requestsService: RequestsService,
    private technicalCapabilitiesService: LocationFeaturesService
  ) {}

  ngOnInit(): void {
    this.requestsService.requestsList().subscribe(requests => {
      this.requests = requests;
    });

    // tslint:disable-next-line:no-magic-numbers
    this.technicalCapabilitiesService.oneLocationFeature(2419).subscribe(technicalCapability => {
      this.technicalCapability = technicalCapability;
    });
  }

  onClarifyingClick(): void {
    this.forms.internet = true;
  }

  saveInternetClarification(): void {
    this.forms.internet = false;
  }

  onClarifyingInternetCancel(): void {
    this.forms.internet = false;
  }
}
