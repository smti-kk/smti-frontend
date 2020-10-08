import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UsersPage} from '../users-page';

class DialogData {
}

@Component({
  selector: 'app-form-create-user',
  templateUrl: './form-create-user.component.html',
  styleUrls: ['./form-create-user.component.scss']
})
export class FormCreateUserComponent implements OnInit {

  form: FormGroup;
  roles: {[key: string]: string};

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UsersPage>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
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
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      patronymicName: ['', Validators.required],
      email: ['', Validators.required],
      roles: ['', Validators.required],
      password: ['', Validators.required],
      repeat: ['', [Validators.required, this.confirmationValidator]],
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
