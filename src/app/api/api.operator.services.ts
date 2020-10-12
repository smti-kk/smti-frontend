import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {OperatorServiceItem} from './dto/OperatorServiceItem';
import {HttpClient} from '@angular/common/http';
import {OPERATOR_SERVICES_API} from '../../environments/api.routes';

@Injectable({
  providedIn: 'root'
})
export class ApiOperatorServices {
  constructor(private http: HttpClient) {
  }

  operatorServices(): Observable<OperatorServiceItem[]> {
    return this.http.get<OperatorServiceItem[]>(OPERATOR_SERVICES_API);
  }
}
