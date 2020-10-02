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

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UsersPage>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      patronymicName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
