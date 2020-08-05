import {Component} from '@angular/core';
import {ApiFeaturesRequests} from '@api/features-requests/ApiFeaturesRequests';
import {ActivatedRoute} from '@angular/router';
import {LocationFeatureEditingRequest} from '@api/dto/LocationFeatureEditingRequest';

@Component({
  selector: 'plan-page',
  templateUrl: 'plan-page.html',
  styleUrls: ['plan-page.scss']
})
export class PlanPage {
  requests: LocationFeatureEditingRequest[];

  constructor(private readonly requestsService: ApiFeaturesRequests,
              private readonly activatedRoute: ActivatedRoute) {
    const locationId = activatedRoute.snapshot.params.id;
    requestsService.requests(locationId).subscribe(requests => this.requests = requests);
  }
}
