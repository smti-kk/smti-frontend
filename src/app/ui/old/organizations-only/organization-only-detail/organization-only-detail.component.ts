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
  selector: 'app-organization-only-detail',
  templateUrl: './organization-only-detail.component.html',
  styleUrls: ['./organization-only-detail.component.scss'],
})
export class OrganizationOnlyDetailComponent implements OnInit {
  organization: Organization;

  organizationParent: string;

  points: Reaccesspoint[];

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

    this.serviceOrganizations.getPoints(organizationId).subscribe((res) => {
      this.points = res;
    })

    if (organizationId) {
      this.serviceOrganizations.getByIdentifier(organizationId).subscribe(organization => {
        this.organization = organization;
        if (this.organization.parent !== undefined) {
          this.serviceOrganizations.getByIdentifier(String(this.organization.parent)).subscribe(organizationParent => {
            this.organizationParent = organizationParent.name;
          });
        } else {
          this.organizationParent = null;
        }
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

  initMonitoringAccessPoint(point: Reaccesspoint) {
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
