import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {StoreService} from '@core/services/store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // eslint-disable-next-line class-methods-use-this
  intercept(req: HttpRequest<{}>, next: HttpHandler): Observable<HttpEvent<{}>> {
    const token = StoreService.get('token');

    if (token) {
      const authReq = req.clone({setHeaders: {Authorization: `Token ${token}`}});
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
