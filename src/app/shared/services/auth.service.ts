import { Injectable } from '@angular/core';
import {SharedModule} from '../shared.module';

@Injectable({
  providedIn: SharedModule,
})
export class AuthService {

  constructor() { }

  getMessage(): string {
    return 'hello!';
  }
}
