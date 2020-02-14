import {Component, OnInit} from '@angular/core';
import {OrganizationsService} from '@core/services';
import {Observable} from 'rxjs';
import {Organization} from '@core/models';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss'],
})
export class OrganizationDetailComponent implements OnInit {
  organization: Organization;
  form: FormGroup;

  constructor(
    private serviceOrganizations: OrganizationsService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  /*
  <div>Краткое наименование: {{ organization.name }} <input type="text" > </div>
        <div>Полное наименование: {{ organization.fullName }}</div>
        <div>Адрес: {{ organization.address }}</div>
        <div>ИНН: {{ organization.inn }}</div>
        <div>КПП: {{ organization.kpp }}</div>
        <div>ФИАС: {{ organization.fias }}</div>
        <div>Тип: {{ organization.type.name }}</div>
        <div>СЗО: {{ organization.smoType.name }}</div>
   */

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.serviceOrganizations.getByIdentifier(params.get('id')).subscribe(organization => {
        this.buildForm(organization);
        this.organization = organization;
      });
    });
  }

  private buildForm(o: Organization) {
    this.form = this.fb.group({
      _fullName: null,
      _id: null,
    });

    this.form.patchValue(o);

    this.form.disable();
  }

  cancelEdit() {
    this.form.reset();
    this.form.patchValue(this.organization);
    this.form.disable();
  }

  enableForm() {
    this.form.enable();
  }

  saveRequest() {
    console.log(this.form.value);
    console.log(this.organization);
    this.serviceOrganizations.save();
  }
}
