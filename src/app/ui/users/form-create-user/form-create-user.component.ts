import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UsersPage} from '../users-page';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {UserFromApi} from '@api/dto/UserFromApi';

@Component({
  selector: 'app-form-create-user',
  templateUrl: './form-create-user.component.html',
  styleUrls: ['./form-create-user.component.scss']
})
export class FormCreateUserComponent implements OnInit {

  viewPasswordControls = false;

  form: FormGroup;
  roles: { [key: string]: string };
  action: 'EDIT' | 'CREATE';
  passwordControl: FormControl;
  repeatControl: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UsersPage>,
    @Inject(MAT_DIALOG_DATA) public data: UserFromApi
  ) {
    this.roles = {};
    this.roles.ADMIN = 'Администратор';
    this.roles.GUEST = 'Посетитель';
    this.roles.MUNICIPALITY = 'Муниципалитет';
    this.roles.ORGANIZATION = 'Оператор - Организации';
    this.roles.OPERATOR = 'Оператор - Локации';
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      isActive: [true],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      patronymicName: ['', Validators.required],
      email: ['', Validators.required],
      roles: ['', Validators.required],
    });
    this.passwordControl = new FormControl(null, Validators.required);
    this.repeatControl = new FormControl(null, [Validators.required, this.confirmationValidator]);
    this.action = 'CREATE';
    if (this.data) {
      this.form.patchValue(this.data);
      this.action = 'EDIT';
    }

    // @ts-ignore
    if (this.data.oid) {
      this.form.get('username').disable();
      this.form.get('firstName').disable();
      this.form.get('lastName').disable();
      this.form.get('patronymicName').disable();
      this.form.get('email').disable();
    }
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.form.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  }

  cancel(): void {
    this.dialogRef.close();
  }

  isDisabled(): void {

  }

  editPass(event: MatCheckboxChange): void {
    if (event.checked) {
      this.form.addControl('password', this.passwordControl);
      this.form.addControl('repeat', this.repeatControl);
    } else {
      this.form.removeControl('password');
      this.form.removeControl('repeat');
    }
  }
}
