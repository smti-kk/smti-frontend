import {OperatorsApi} from './OperatorsApi';
import {Operators} from '../dto/Operators';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Operator} from '@api/dto/Operator';

export class OACacheable implements OperatorsApi {
  private readonly origin: OperatorsApi;
  private cachedOperators: Operators;
  private cachedOperatorsFull: Operator[];

  constructor(origin: OperatorsApi) {
    this.origin = origin;
  }

  get(): Observable<Operators> {
    if (this.cachedOperators) {
      return of(this.cachedOperators);
    } else {
      return this.origin.get().pipe(
        tap(response => this.cachedOperators = response)
      );
    }
  }

  findAll(): Observable<Operator[]> {
    if (this.cachedOperators) {
      return of(this.cachedOperatorsFull);
    } else {
      return this.origin.findAll().pipe(
        tap(response => this.cachedOperatorsFull = response)
      );
    }
  }
}
