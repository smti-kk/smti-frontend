import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { User } from '@shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front';

  user: User;

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      this.user = user;

      if (!user && window.location.pathname !== '/login') {
        this.router.navigateByUrl('/login');
      }
    });
  }

  logout() {
    this.auth.logout();
  }
}
