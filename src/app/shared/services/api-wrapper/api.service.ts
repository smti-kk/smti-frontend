import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelMapper } from './model-mapper';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiRoot = '/api';

  constructor(
    private http: HttpClient
  ) {}


  public get<T>(url: string, itemType: any): Observable<T[]> {
    if (!url) {
      return;
    }

    return this.http.get<T[]>(url)
      .pipe(
        map(data => data.map((item: any) => {
            return new ModelMapper(itemType).map(item);
          }
        ))
      );
  }
}
