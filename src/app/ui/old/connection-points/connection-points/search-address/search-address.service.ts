import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ADDRESS_AUTOCOMPLETE, API_VERSION} from 'src/environments/api.routes';


@Injectable({
  providedIn: 'root',
})
export class SearchAddressService {
  constructor(private http: HttpClient) {}

  search(searchString: string): Observable<string[]> {
    let params = new HttpParams();
    params = params.set('address', searchString.toString());

    return this.http.get<string[]>(ADDRESS_AUTOCOMPLETE, {params});
  }
}
