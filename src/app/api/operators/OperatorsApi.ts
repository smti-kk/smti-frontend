import {Operators} from '../dto/Operators';
import {Observable} from 'rxjs';
import {Operator} from '@api/dto/Operator';
import {Pageable} from '@api/dto/Pageable';

export abstract class OperatorsApi {
  abstract get(): Observable<Operators>;
  abstract findAll(page: number, size: number): Observable<Pageable<Operator[]>>;
  abstract findAll(): Observable<Operator[]>;
  abstract remove(id: number): Observable<void>;
  abstract create(operator: Operator): Observable<Operator>;
  abstract update(operator: Operator): Observable<Operator>;
}

