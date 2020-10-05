import {OperatorsApi} from './OperatorsApi';
import {Operators} from '../dto/Operators';
import {Observable, of} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';
import {Operator} from '@api/dto/Operator';
import {Pageable} from '@api/dto/Pageable';

export class OACacheable implements OperatorsApi {
  private readonly origin: OperatorsApi;
  private cachedOperators: Observable<Operators>;
  private cachedOperatorsFull: Operator[];

  constructor(origin: OperatorsApi) {
    this.origin = origin;
  }

  get(): Observable<Operators> {
    if (!this.cachedOperators) {
      this.cachedOperators = this.origin.get().pipe(
        shareReplay()
      );
    }
    return this.cachedOperators;
  }

  findAll(page: number, size: number): Observable<Pageable<Operator[]>>;
  findAll(): Observable<Operator[]>;
  findAll(page?: number, size?: number): Observable<any> {
    if (page && size) {
      return this.origin.findAll(page, size);
    }
    if (this.cachedOperatorsFull) {
      return of(this.cachedOperatorsFull);
    } else {
      return this.origin.findAll().pipe(
        tap(response => this.cachedOperatorsFull = response)
      );
    }
  }

  create(operator: Operator): Observable<Operator> {
    return this.origin.create(operator)
      .pipe(
        tap(newOperator => {
          this.cachedOperatorsFull.push(newOperator);
          this.cachedOperators = null;
        })
      );
  }

  remove(id: number): Observable<void> {
    return this.origin.remove(id)
      .pipe(
        tap(() => {
          const deletedOperator = this.cachedOperatorsFull.find(operator => operator.id === id);
          this.cachedOperatorsFull = this.cachedOperatorsFull.splice(
            this.cachedOperatorsFull.indexOf(deletedOperator), 1
          );
        })
      );
  }

  update(operator: Operator): Observable<Operator> {
    return this.origin.update(operator)
      .pipe(
        tap((newOperator) => {
          const updatedOperator = this.cachedOperatorsFull.find(currentOperator => operator.id === currentOperator.id);
          this.cachedOperatorsFull[this.cachedOperatorsFull.indexOf(updatedOperator)] = newOperator;
        })
      );
  }
}
