import { Component, OnInit } from '@angular/core';
import { RequestsService } from './service/requests.service';
import { Request } from './model/request';
import { LocationFeatures, TrunkChannelType } from '@core/models';
import { LocationFeaturesService } from '@core/services/location-features.service';

@Component({
  selector: 'requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  requests: Request[];
  technicalCapability: LocationFeatures;

  TrunkChannelType = TrunkChannelType;

  forms: {
    internet: boolean;
  } = {
    internet: false
  };

  constructor(private requestsService: RequestsService, private technicalCapabilitiesService: LocationFeaturesService) {
  }

  ngOnInit(): void {
    this.requestsService.requestsList().subscribe(requests => {
      this.requests = requests;
    });

    // tslint:disable-next-line:no-magic-numbers
    this.technicalCapabilitiesService.oneLocationFeature(2419).subscribe(technicalCapability => {
      this.technicalCapability = technicalCapability;
    });
  }

  onClarifyingClick() {
    this.forms.internet = true;
  }

  saveInternetClarification() {
    this.forms.internet = false;
  }

  onClarifyingInternetCancel() {
    this.forms.internet = false;
  }
}
