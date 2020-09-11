import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {Location, Organization, qualityToString} from '@core/models';
import {OrganizationsService} from '@core/services';
import {LocationServiceOrganizationAccessPointsWithFilterParams} from '@core/services/location.service';
import {Reaccesspoint} from '@core/models/reaccesspoint';
import {NzModalService} from 'ng-zorro-antd';
import {FormAccessPointComponent} from '@shared/components/form-access-point/form-access-point.component';
import {FomMonitoringWizardComponent} from '@shared/components/fom-monitoring-wizard/fom-monitoring-wizard.component';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss'],
})
export class OrganizationDetailComponent implements OnInit {
  organization: Organization;

  points$: Observable<Reaccesspoint[]>;

  fLocations$: Observable<Location[]>;

  qualityToString = qualityToString;

  constructor(
    private serviceOrganizations: OrganizationsService,
    public serviceLocation: LocationServiceOrganizationAccessPointsWithFilterParams,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.fLocations$ = this.serviceLocation.listSimpleLocations();
    const organizationId = this.activatedRoute.snapshot.params.id;
    const locationId = parseInt(this.activatedRoute.snapshot.queryParams.locationId, 10);

    this.points$ = this.serviceOrganizations.getPoints(organizationId);

    if (organizationId) {
      this.serviceOrganizations.getByIdentifier(organizationId).subscribe(organization => {
        this.organization = organization;
      });
    } else {
      const organization = new Organization(locationId);
      this.organization = organization;
    }
  }

  addNewAccessPoint(): void {
    this.modal.create({
      nzTitle: 'Добавление точки доступа',
      nzContent: FormAccessPointComponent,
      nzFooter: null,
      nzComponentParams: {
        organization: this.organization,
        mode: 'CREATE'
      },
    });
  }

  editAccessPoint(point: Reaccesspoint): void {
    this.modal.create({
      nzTitle: 'Редактирование точки доступа',
      nzContent: FormAccessPointComponent,
      nzFooter: null,
      nzComponentParams: {
        accessPointForEdit: point,
        organization: this.organization,
        mode: 'UPDATE'
      },
    });
  }

  initMonitoringAccessPoint(point: Reaccesspoint): void {
    this.modal.create({
      nzTitle: 'Подключить к системам мониторинга',
      nzContent: FomMonitoringWizardComponent,
      nzFooter: null,
      nzComponentParams: {
        accessPointForEdit: point,
        organization: this.organization,
      },
    });
  }
}
