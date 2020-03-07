import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '@core/services';
import {NotificationService} from '@core/services/notification.service';

import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  API_BASE_URL = environment.API_BASE_URL;

  private user: Subscription;

  authorizationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authorization: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.tryLoginByEsia();

    this.authorizationForm = this.fb.group({
      email: '',
      password: '',
    });

    this.user = this.authorization.user.subscribe(user => {
      if (user) {
        this.router.navigate(['']).then();
      }
    });
  }

  onSubmit(): void {
    this.authorization.login(this.authorizationForm.value).subscribe(
      isLogin => {
        if (isLogin) {
          this.router.navigate(['']).then();
        }
      },
      error => {
        if (error.status === 400) {
          this.notificationService.error('Введен неверный логин или пароль', 'Ошибка авторизации');
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.user.unsubscribe();
  }

  private tryLoginByEsia(): void {
    const esiaToken = this.activatedRoute.snapshot.queryParams.temp_token;

    if (esiaToken) {
      this.authorization.loginEsia(esiaToken);
    }
  }
}
