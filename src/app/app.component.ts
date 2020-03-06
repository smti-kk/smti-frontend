import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '@core/services';
import {User} from '@core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'front';

  user: User;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      this.user = user;

      if (!user && window.location.pathname !== '/login') {
        this.router.navigateByUrl('/login');
      }
    });
  }

  logout(): void {
    this.auth.logout();
  }
}
