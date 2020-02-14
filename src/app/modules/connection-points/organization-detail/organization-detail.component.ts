import {Component, OnInit} from '@angular/core';
import {OrganizationsService} from '@core/services';
import {Organization, OrganizationType, SmoType} from '@core/models';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss'],
})
export class OrganizationDetailComponent implements OnInit {
  organization: Organization;
  formGroupOrganization: FormGroup;
  fOrganizationTypes$: Observable<OrganizationType[]>;
  fOrganizationSMOTypes$: Observable<SmoType[]>;

  constructor(
    private serviceOrganizations: OrganizationsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  compareFn(c1: {id: number}, c2: {id: number}): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  ngOnInit() {
    this.fOrganizationTypes$ = this.serviceOrganizations.getTypes();
    this.fOrganizationSMOTypes$ = this.serviceOrganizations.getSMOTypes();

    this.activatedRoute.paramMap.subscribe(params => {
      this.serviceOrganizations.getByIdentifier(params.get('id')).subscribe(organization => {
        this.buildForm(organization);
        this.organization = organization;
      });
    });
  }

  private buildForm(o: Organization) {
    this.formGroupOrganization = this.formBuilder.group({
      _id: null,
      _name: [null, Validators.required],
      _fullName: [null, Validators.required],
      _address: [null, Validators.required],
      _inn: [null, Validators.required],
      _kpp: [null, Validators.required],
      _fias: [
        null,
        Validators.pattern(
          '\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b'
        ),
      ],
      _type: null,
      _smoType: null,
    });

    this.formGroupOrganization.patchValue(o);

    this.formGroupOrganization.disable();
  }

  cancelEdit() {
    this.formGroupOrganization.reset();
    this.formGroupOrganization.patchValue(this.organization);
    this.formGroupOrganization.disable();
  }

  enableForm() {
    this.formGroupOrganization.enable();
  }

  saveRequest() {
    console.log('data  from FORM: ', this.formGroupOrganization.value);
    console.log('data originated: ', this.organization);
    this.serviceOrganizations.save();
  }
}
