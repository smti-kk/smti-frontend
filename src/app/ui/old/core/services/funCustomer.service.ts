import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ORGANIZATION_FUN_CUSTOMER,
  ORGANIZATION_FUN_CUSTOMER_CREATE_UPDATE,
  ORGANIZATION_FUN_CUSTOMER_LIST,
} from '@core/constants/api';
import {
  FunCustomer,
  IFunCustomer,
} from '@core/models/funCustomer';
import { GenericDeserialize } from 'cerialize';
import { map } from 'rxjs/operators';

@Injectable()
export class FunCustomerService {
  constructor(private readonly httpClient: HttpClient) {}

  getCustomers(): Observable<FunCustomer[]> {
    return this.httpClient
      .get<IFunCustomer[]>(ORGANIZATION_FUN_CUSTOMER_LIST)
      .pipe(
        map((rawCustomers) =>
          rawCustomers.map((rawCustomer) =>
            GenericDeserialize<FunCustomer>(rawCustomer, FunCustomer)
          )
        )
      );
  }

  create(newFunCustomer: Omit<IFunCustomer, 'id'>): Observable<FunCustomer> {
    return this.httpClient
      .post(ORGANIZATION_FUN_CUSTOMER_CREATE_UPDATE, newFunCustomer)
      .pipe(
        map((funCustomer) =>
          GenericDeserialize<FunCustomer>(funCustomer, FunCustomer)
        )
      );
  }

  update(updatedFunCustomer: IFunCustomer): Observable<FunCustomer> {
    return this.httpClient
    .put(ORGANIZATION_FUN_CUSTOMER_CREATE_UPDATE, updatedFunCustomer).pipe(
      map((funCustomer) =>
        GenericDeserialize<FunCustomer>(funCustomer, FunCustomer)
      )
    );
  }

  delete(id: number) {
    const url = ORGANIZATION_FUN_CUSTOMER.replace(':id', id.toString(10));
    return this.httpClient.delete(url);
  }
}
