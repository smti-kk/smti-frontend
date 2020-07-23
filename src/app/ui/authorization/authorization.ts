import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '@service/authorization/authorization.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'authorization',
  templateUrl: './authorization.html',
  styleUrls: ['./authorization.scss']
})
export class Authorization implements OnInit {
  readonly form: FormGroup;
  isIncorrectLoginOrPassword = false;

  constructor(private authorizationService: AuthorizationService,
              private fb: FormBuilder) {
    this.form = fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  authorize(): void {
    if (!this.form.valid) {
      return;
    }
    this.authorizationService.authorize(this.form.get('email').value, this.form.get('password').value)
      .subscribe(
        () => window.location.reload(),
        () => this.isIncorrectLoginOrPassword = true
      );
  }
}
