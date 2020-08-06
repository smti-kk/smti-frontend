import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {StorageService} from '../storage/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) {
  }

  // eslint-disable-next-line class-methods-use-this
  intercept(req: HttpRequest<{}>, next: HttpHandler): Observable<HttpEvent<{}>> {
    const token = this.storage.getToken();
    if (token) {
      const authReq = req.clone({setHeaders: {Authorization: `Token ${token}`}});
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
