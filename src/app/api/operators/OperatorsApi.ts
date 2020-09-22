import {Operators} from '../dto/Operators';
import {Observable} from 'rxjs';
import {Operator} from '@api/dto/Operator';

export abstract class OperatorsApi {
  abstract get(): Observable<Operators>;
  abstract findAll(): Observable<Operator[]>;
}

