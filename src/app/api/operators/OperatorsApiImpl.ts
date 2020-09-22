import {Observable} from 'rxjs';
import {Operators} from '../dto/Operators';
import {OperatorsApi} from './OperatorsApi';
import {HttpClient} from '@angular/common/http';
import {OPERATORS_API} from '../../../environments/api.routes';
import {Operator} from '@api/dto/Operator';

export class OperatorsApiImpl implements OperatorsApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  get(): Observable<Operators> {
    return this.httpClient.get<Operators>(OPERATORS_API + '/grouped');
  }

  findAll(): Observable<Operator[]> {
    return this.httpClient.get<Operator[]>(OPERATORS_API);
  }
}
