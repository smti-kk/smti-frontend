import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TYPE_ORGANIZATION} from '../../environments/api.routes';
import {Observable} from 'rxjs';
import {TypeOrganization} from './dto/TypeOrganization';

@Injectable({
  providedIn: 'root'
})
export class ApiOrganizationType {
  constructor(private http: HttpClient) {
  }

  public list(): Observable<TypeOrganization[]> {
    return this.http.get<TypeOrganization[]>(TYPE_ORGANIZATION + '/');
  }

  public item(id: number): Observable<TypeOrganization> {
    return this.http.get<TypeOrganization>(TYPE_ORGANIZATION + '/' + id);
  }

  public createOrUpdateOrganizationType(type: TypeOrganization): Observable<TypeOrganization> {
    return this.http.post<TypeOrganization>(TYPE_ORGANIZATION, type);
  }

  public deleteTypeOrganization(id: number): Observable<void> {
    return this.http.delete<void>(TYPE_ORGANIZATION + '/' + id);
  }
}
