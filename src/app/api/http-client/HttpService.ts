import {HttpBackend, HttpClient, HttpInterceptor} from '@angular/common/http';
import {HandlerService} from './HandlerService';

export class HttpService extends HttpClient {
  constructor(backend: HttpBackend, interceptor: HttpInterceptor[]) {
    super(new HandlerService(backend, interceptor));
  }
}
