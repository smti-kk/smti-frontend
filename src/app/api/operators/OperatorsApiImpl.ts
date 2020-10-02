import {Observable} from 'rxjs';
import {Operators} from '../dto/Operators';
import {OperatorsApi} from './OperatorsApi';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OPERATORS_API} from '../../../environments/api.routes';
import {Operator} from '@api/dto/Operator';
import {Pageable} from '@api/dto/Pageable';

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
    if (page && size) {
      params = params
        .set('page', page.toString())
        .set('size', size.toString());
    }
    return this.httpClient.get<Operator[]>(OPERATORS_API, {params});
  }

  create(operator: Operator): Observable<Operator> {
    return this.httpClient.post<Operator>(OPERATORS_API, operator);
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete<void>(OPERATORS_API + `/${id}`);
  }

  update(operator: Operator): Observable<Operator> {
    return this.httpClient.post<Operator>(OPERATORS_API, operator);
  }
}
