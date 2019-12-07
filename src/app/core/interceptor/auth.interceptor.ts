import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from '@core/services/store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storeService: StoreService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storeService.get('token');

    if (token) {
      const authReq = req.clone({setHeaders: {Authorization: 'Token ' + token}});
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
