import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FunCustomer } from '@core/models/funCustomer';
import { GenericDeserialize } from 'cerialize';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const funCustomers = [
  { id: 1, name: 'МинСоцПол' },
  { id: 2, name: 'МинСоцПолМинФин' },
  { id: 3, name: 'Аг ГО и ЧИ' },
  { id: 4, name: 'Аг Занятости' },
  { id: 5, name: 'Аг Печати' },
  { id: 6, name: 'ВетНадзор' },
  { id: 7, name: 'ГТН' },
  { id: 8, name: 'ЗАГС' },
  { id: 9, name: 'ЗАГСМинФин' },
  { id: 10, name: 'МинЗдрав' },
  { id: 11, name: 'МинЗдравМинФин' },
  { id: 12, name: 'МинКульт' },
  { id: 13, name: 'МинЛес' },
  { id: 14, name: 'МинОбр' },
  { id: 15, name: 'МинСпорт' },
  { id: 16, name: 'МинТранс' },
  { id: 17, name: 'МинФИн' },
  { id: 18, name: 'МирСуд' },
  { id: 19, name: 'МЦР' },
  { id: 20, name: 'МЭиРП' },
  { id: 21, name: 'СтройНадзор' },
  { id: 22, name: 'ЦИТ' },
];

@Injectable()
export class funCustomerService {
  constructor(private readonly httpClient: HttpClient) {}

  getCustomers(): Observable<FunCustomer[]> {
    return of(funCustomers).pipe(
      map((rawCustomers) =>
        rawCustomers.map((rawCustomer) =>
          GenericDeserialize<FunCustomer>(rawCustomer, FunCustomer)
        )
      )
    );
  }
}
