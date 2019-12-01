import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreService } from '@core/services/store.service';

export class ApiService {
  constructor(
    protected http: HttpClient,
    private store: StoreService) {
  }

  // noinspection JSMethodCanBeStatic
  protected createContentTypeHeader(headers: HttpHeaders): HttpHeaders {
    return headers.append('Content-Type', 'application/json');

  }

  protected createTokenHeader(headers: HttpHeaders): HttpHeaders {
    const token = this.store.get('token');
    if (token) {
      headers = headers.append('Authorization', `Token ${token}`);
    }

    // headers = headers.append('Access-Control-Allow-Origin', '*');

    return headers;
  }

  protected get<T>(url, params?: HttpParams): Observable<HttpResponse<T>> {
    const headers = this.createContentTypeHeader(
      this.createTokenHeader(
        new HttpHeaders(),
      ),
    );
    return this.http.get<T>(
      url,
      {
        headers,
        observe: 'response',
        responseType: 'json',
        params,
      },
    );
  }

  protected headersAppend(headers, newHeaders): HttpHeaders {
    let headersResult = headers;
    newHeaders.forEach((header) => {
      headersResult = headersResult.append(header.name, header.value);
    });
    return headersResult;
  }

  protected post<T>(url, data, params: any = {}): Observable<HttpResponse<T>> {
    let headers = new HttpHeaders();
    if (!params.noContentType) {
      headers = this.createContentTypeHeader(headers);
    }
    headers = this.createTokenHeader(headers);
    if (params.headers) {
      headers = this.headersAppend(headers, params.headers);
    }

    return this.http.post<T>(
      url,
      data,
      {
        headers,
        observe: 'response',
        responseType: 'json',
      },
    );
  }

  protected put<T>(url, data, params: any = {}): Observable<HttpResponse<T>> {
    let headers = new HttpHeaders();
    if (!params.noContentType) {
      headers = this.createContentTypeHeader(headers);
    }
    headers = this.createTokenHeader(headers);
    if (params.headers) {
      headers = this.headersAppend(headers, params.headers);
    }

    return this.http.put<T>(
      url,
      data,
      {
        headers,
        observe: 'response',
        responseType: 'json',
      },
    );
  }

  protected delete(url) {
    const headers = this.createTokenHeader(new HttpHeaders());

    return this.http.delete(url, {
      headers,
    });
  }
}
