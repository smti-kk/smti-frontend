import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Organization } from '@core/models';
import { Reaccesspoint } from '@core/models/reaccesspoint';
import { FomMonitoringWizardComponent } from '@shared/components/fom-monitoring-wizard/fom-monitoring-wizard.component';
import { FormAccessPointComponent } from '@shared/components/form-access-point/form-access-point.component';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-access-point-detail',
  templateUrl: './access-point-detail.component.html',
  styleUrls: ['./access-point-detail.component.scss']
})
export class AccessPointDetailComponent implements OnInit {

  @Input() ap: Reaccesspoint;
  @Input() organization: Organization;

  constructor(

    private modal: NzModalService
  ) { }

  ngOnInit(): void {
  }

  initMonitoringAccessPoint(): void {
    this.modal.create({
      nzTitle: 'Подключить к системам мониторинга',
      nzContent: FomMonitoringWizardComponent,
      nzFooter: null,
      nzComponentParams: {
        accessPointForEdit: this.ap,
        organization: this.organization,
      },
    });
  }

  editAccessPoint(): void {
    this.modal.create<FormAccessPointComponent, Reaccesspoint | undefined >({
      nzTitle: 'Редактирование точки доступа',
      nzContent: FormAccessPointComponent,
      nzFooter: null,
      nzComponentParams: {
        accessPointForEdit: this.ap,
        organization: this.organization,
        mode: 'UPDATE'
      },
      nzOnOk: ({ ap }) => {
        this.ap = ap;
      },
      })
  }
}
