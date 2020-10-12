import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SmoType} from './dto/SmoType';
import {TYPE_SMO} from '../../environments/api.routes';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiSmoType {
  constructor(private http: HttpClient) {
  }

  public list(): Observable<SmoType[]> {
    return this.http.get<SmoType[]>(TYPE_SMO + '/');
  }

  public item(id: number): Observable<SmoType> {
    return this.http.get<SmoType>(TYPE_SMO + '/' + id);
  }

  public createSmoType(typeSmo: SmoType): Observable<SmoType> {
    return this.http.post<SmoType>(TYPE_SMO, typeSmo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(TYPE_SMO + '/' + id);
  }
}
