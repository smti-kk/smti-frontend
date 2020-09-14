import {Component, Input, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location, Organization, OrganizationType, SmoType} from '@core/models';
import {OrganizationsService} from '@core/services';
import {Observable} from 'rxjs';
import {compareById} from '@core/utils/compare';
import {LocationService} from '@core/services/location.service';
import {Router} from '@angular/router';
import {NzModalRef} from 'ng-zorro-antd';
import {TrunkChannel} from '../../../../../api/dto/TrunkChannel';
import {AreYouSureComponent} from '../../../../dialogs/are-you-sure/are-you-sure.component';
import {MatDialog} from '@angular/material/dialog';
import {createLogErrorHandler} from '@angular/compiler-cli/ngcc/src/execution/tasks/completion';
import {TrunkChannelsApi} from '../../../../../api/trunk-channels/TrunkChannelsApi';
import {ApiOrganization} from '../../../../../api/organizations/ApiOrganization';

@Component({
  selector: 'app-form-organization',
  templateUrl: './form-organization.component.html',
  styleUrls: ['./form-organization.component.scss'],
})
export class FormOrganizationComponent implements OnInit {

  @Input() organizationForEdit: Organization;

  formGroupOrganization: FormGroup;

  locations$: Observable<Location[]>;

  fOrganizationTypes$: Observable<OrganizationType[]>;

  fOrganizationSMOTypes$: Observable<SmoType[]>;

  compareFn = compareById;

  constructor(
    private readonly api: ApiOrganization,
    private locationsService: LocationService,
    private serviceOrganizations: OrganizationsService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Optional() private modalRef: NzModalRef,
    private readonly dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.fOrganizationTypes$ = this.serviceOrganizations.getTypes();
    this.fOrganizationSMOTypes$ = this.serviceOrganizations.getSMOTypes();

    if (this.organizationForEdit) {
      this.buildForm(this.organizationForEdit);
      this.locations$ = this.locationsService.getLocationByName(this.organizationForEdit.location.name);
    } else {
      this.buildForm();
    }

  }

  private buildForm(organization?: Organization): void {
    this.formGroupOrganization = this.formBuilder.group({
      _id: null,
      _location: [null, Validators.required],
      _name: [null, Validators.required],
      _acronym: [null, Validators.required],
      _address: [null, Validators.required],
      _inn: [null, Validators.required],
      _kpp: [null, Validators.required],
      _fias: [
        null,
        [
          Validators.pattern(
            '\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b',
          ),
          Validators.required,
        ],
      ],
      _type: null,
      _smoType: null,
    });

    if (organization) {
      this.formGroupOrganization.patchValue(organization);
      this.formGroupOrganization.disable();
    }
  }

  cancelEdit(): void {
    if (this.modalRef) {
      this.modalRef.destroy();
    } else {
      this.formGroupOrganization.reset();
      this.formGroupOrganization.patchValue(this.organizationForEdit);
      this.formGroupOrganization.disable();
    }
  }

  enableForm(): void {
    this.formGroupOrganization.enable();
  }

  saveEditOrganization(): void {
    this.serviceOrganizations.put(this.formGroupOrganization.value).subscribe(
      organization => {
        this.organizationForEdit = organization;
      },
      error => {
        // todo: обработка ошибки
        this.formGroupOrganization.enable();
        throw Error(`${error}`);
      },
    );
    this.formGroupOrganization.disable();
  }

  isCreate(): boolean {
    return this.organizationForEdit && !this.organizationForEdit.id;
  }

  saveNewOrganization(): void {
    this.serviceOrganizations.save(this.formGroupOrganization.value).subscribe(
      () => {
        this.modalRef.destroy();
      },
      error => {
        throw Error(`${error}`);
        // todo: implement me
      },
    );
  }

  onChange(location: string): void {
    this.locations$ = this.locationsService.getLocationByName(location);
  }

  delete(): void {
    // const dialogRef = this.dialog.open(AreYouSureComponent, {
    //   width: '450px',
    //   data: 'Вы уверены, что хотите удалить организацию?'
    // });
    // dialogRef.afterClosed().subscribe(isAccepted => {
    //   if (isAccepted) {
    //     this.api.remove(this.organizationForEdit.id).subscribe(() => {
    //       this.dataSource.data = this.dataSource.data.filter(bs => bs.id !== row.id);
    //     });
    //   }
    // });
  }

}
