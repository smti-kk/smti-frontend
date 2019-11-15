import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { StoreService } from '../store.service';
import { map } from 'rxjs/operators';
import { ApiMapper } from '../../utils/api-mapper';

export class RestApiService<ShortModel,
  DetailModel,
  WriteModel> extends ApiService {
  protected readonly baseUrl: string;

  constructor(http: HttpClient,
              store: StoreService,
              baseUrl: string,
              private mapper: ApiMapper<ShortModel, DetailModel, WriteModel>) {
    super(http, store);
    if (!baseUrl.startsWith('/')) {
      baseUrl = `/${baseUrl}`;
    }
    this.baseUrl = `${environment.API_BASE_URL || ''}${baseUrl}`;
  }

  public one(id?: number): Observable<DetailModel> {
    return this.get<DetailModel>(`${this.baseUrl}/${id ? `${id}/` : ''}`)
      .pipe(map((data) => this.parseResponseOne(data)));
  }

  public list(params?: HttpParams): Observable<ShortModel[]> {
    return this.get<ShortModel[]>(`${this.baseUrl}/`, params)
      .pipe(map((data) => this.parseResponseList(data)));
  }

  public save(entity: WriteModel): Observable<DetailModel> {
    return this.post<DetailModel>(`${this.baseUrl}/`, entity)
      .pipe(map((data) => this.parseResponseOne(data)));
  }

  public saveById(entity: WriteModel, entityId: number): Observable<DetailModel> {
    return this.put<DetailModel>(`${this.baseUrl}/${entityId}/`, entity)
      .pipe(map((data) => this.parseResponseOne(data)));
  }

  protected createInstance<T>(data?): T {
    return data as T;
  }

  protected createInstanceShort(data?): ShortModel {
    if (data) {
      return this.mapper.mapShortApi(data);
    }
    return this.createInstance<ShortModel>(data);
  }

  protected createInstanceDetail(data?): DetailModel {
    return this.createInstance<DetailModel>(data);
  }

  private parseResponseList(response: HttpResponse<ShortModel[]>): ShortModel[] {
    try {
      const list: any[] = response.body;
      return list.map((data) => this.createInstanceShort(data));
    } catch (error) {
      return [];
    }
  }

  private parseResponseOne(response: HttpResponse<DetailModel>): DetailModel {
    try {
      return this.mapper.mapDetailApi(response.body);
    } catch (error) {
      return this.createInstanceDetail();
    }
  }
}
