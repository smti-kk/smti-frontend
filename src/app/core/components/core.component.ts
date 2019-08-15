import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  message: string;

  constructor(authService: AuthService) {
    this.message = authService.getMessage();
  }

  ngOnInit() {
  }


}
