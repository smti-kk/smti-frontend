import {Observable} from 'rxjs';
import {Operators} from '../dto/Operators';
import {OperatorsApi} from './OperatorsApi';
import {HttpClient, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {OPERATORS_API} from '../../../environments/api.routes';
import {Operator} from '@api/dto/Operator';
import {Pageable} from '@api/dto/Pageable';
import {filter, flatMap, tap} from 'rxjs/operators';

export class OperatorsApiImpl implements OperatorsApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  get(): Observable<Operators> {
    return this.httpClient.get<Operators>(OPERATORS_API + '/grouped');
  }

  findAll(): Observable<Operator[]>;
  findAll(page: number, size: number): Observable<Pageable<Operator[]>>;
  findAll(page?: number, size?: number): Observable<any> {
    let params = new HttpParams();
    if (page !== undefined && page !== null && size) {
      params = params
        .set('page', page.toString())
        .set('size', size.toString());
    }
    return this.httpClient.get<Operator[]>(OPERATORS_API, {params});
  }

  create(operator: Operator): Observable<Operator> {
    console.log(operator);
    if (operator.iconFile) {
      return this.createIcon(operator.iconFile).pipe(
        flatMap(response => {
          operator.icon = response.body.iconPath;
          return this.httpClient.post<Operator>(OPERATORS_API, operator);
        })
      );
    } else {
      return this.httpClient.post<Operator>(OPERATORS_API, operator);
    }
  }

  createIcon(icon: File): Observable<any> {
    const data = new FormData();
    data.append('icon', icon);
    const req = new HttpRequest('POST', OPERATORS_API + '/add-icon', data);
    return this.httpClient.request(req).pipe(
      filter(response => response instanceof HttpResponse),
      tap(response => {
        console.log(response);
      })
    );
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete<void>(OPERATORS_API + `/${id}`);
  }

  update(operator: Operator): Observable<Operator> {
    return this.create(operator);
  }
}
