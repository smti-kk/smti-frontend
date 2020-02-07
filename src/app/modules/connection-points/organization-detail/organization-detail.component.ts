import {Component, OnInit} from '@angular/core';
import {OrganizationsService} from '@core/services';
import {Observable} from 'rxjs';
import {Organization} from '@core/models';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss'],
})
export class OrganizationDetailComponent implements OnInit {
  organization$: Observable<Organization>;
  constructor(
    private serviceOrganizations: OrganizationsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.organization$ = this.serviceOrganizations.getByIdentifier(params.get('id'));
    });
  }
}
