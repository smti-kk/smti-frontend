import {Component, Input, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location, Organization, OrganizationType, SmoType} from '@core/models';
import {OrganizationsService} from '@core/services';
import {Observable} from 'rxjs';
import {compareById} from '@core/utils/compare';
import {LocationService} from '@core/services/location.service';
import {Router} from '@angular/router';
import {NzModalRef} from 'ng-zorro-antd';
import {AreYouSureComponent} from '../../../../dialogs/are-you-sure/are-you-sure.component';
import {MatDialog} from '@angular/material/dialog';
import {ApiOrganization} from '../../../../../api/organizations/ApiOrganization';
import { FunCustomer } from '@core/models/funCustomer';
import { FunCustomerService } from '@core/services/funCustomer.service';



@Component({
  selector: 'app-form-organization',
  templateUrl: './form-organization.component.html',
  styleUrls: ['./form-organization.component.scss'],
})
export class FormOrganizationComponent implements OnInit {

  @Input() organizationForEdit: Organization;

  @Input() organizationForEditParent: string;

  @Input() canEdit: boolean = false;

  formGroupOrganization: FormGroup;

  locations$: Observable<Location[]>;

  fOrganizationTypes$: Observable<OrganizationType[]>;

  fOrganizationSMOTypes$: Observable<SmoType[]>;

  compareFn = compareById;

  funCustomers$: Observable<FunCustomer[]>;

  constructor(
    private readonly api: ApiOrganization,
    private locationsService: LocationService,
    private serviceOrganizations: OrganizationsService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Optional() private modalRef: NzModalRef,
    private readonly dialog: MatDialog,
    private readonly funCustomerService: FunCustomerService,
  ) {
  }

  ngOnInit() {
    this.fOrganizationTypes$ = this.serviceOrganizations.getTypes();
    this.fOrganizationSMOTypes$ = this.serviceOrganizations.getSMOTypes();
    this.funCustomers$ = this.funCustomerService.getCustomers();

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
      _inn: null,
      _kpp: null,
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
      _fun_customer: null,
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
    if (this.formGroupOrganization.invalid) {
      this.formGroupOrganization.updateValueAndValidity();
      Object.keys(this.formGroupOrganization.controls).forEach(key => {
        this.formGroupOrganization.get(key).markAsDirty();
      });
      console.log(this.formGroupOrganization);
    } else {
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
  }

  isCreate(): boolean {
    return this.organizationForEdit && !this.organizationForEdit.id;
  }

  saveNewOrganization(): void {
    if (this.formGroupOrganization.invalid) {
      this.formGroupOrganization.updateValueAndValidity();
      Object.keys(this.formGroupOrganization.controls).forEach(key => {
        this.formGroupOrganization.get(key).markAsDirty();
      });
      console.log(this.formGroupOrganization);

    } else {
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
  }

  onChange(location: string): void {
    this.locations$ = this.locationsService.getLocationByName(location);
  }

  delete(): void {
    const dialogRef = this.dialog.open(AreYouSureComponent, {
      width: '450px',
      data: 'Вы уверены, что хотите удалить?'
    });
    dialogRef.afterClosed().subscribe(isAccepted => {
      if (isAccepted) {
        this.api.remove(this.organizationForEdit.id).subscribe(() => {
          this.router.navigate(['/organizations-only']);
        });
      }
    });
  }
}
