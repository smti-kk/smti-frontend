import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Pageable} from '../../api/dto/Pageable';
import {LocationFeatureEditingRequestFull} from '../../api/dto/LocationFeatureEditingRequest';
import {removeEmptyStringsFrom} from './../util/DeleteEmptyStrFromObj';
import {API_FEATURES_REQUESTS} from '../../../environments/api.routes';
import {tap} from 'rxjs/internal/operators/tap';
import {saveAs} from 'file-saver';

@Injectable()
export class JournalService {
  private size: number;
  private page: number;
  private totalElements: number;
  private filterParams: any = {};
  private sortParams: any = {};

  defaultDate = '1970-01-01';

  private _journalList: BehaviorSubject<LocationFeatureEditingRequestFull[]> = new BehaviorSubject(
    [],
  );

  constructor(private http: HttpClient) {}

  get journalList() {
    return this._journalList.asObservable();
  }

  private getParams() {
    let params = new HttpParams({
      fromObject: removeEmptyStringsFrom({...this.sortParams, ...this.filterParams}, this.defaultDate),
    });

    if (this.page) {
      params = params.append('page', this.page.toString());
    }

    if (this.size) {
      params = params.append('size', this.size.toString());
    }

    return params;
  }

  run(page: number, size: number) {
    this.page = page;
    this.size = size;
    this.loadContent();
  }

  next() {
    const nextPage = this.page + 1;
    if ((nextPage * this.size) + 1 > this.totalElements) {
      return;
    }

    this.page = nextPage;
    this.loadContent(true);
  }

  filter(filters) {
    this.page = 0;

    let params = {};
    let keys = Object.keys(filters);

    keys.forEach((key) => {
      if (filters[key]) {
        params[key] = filters[key].toString();
      }
    });

    this.filterParams = params;
    this.loadContent();
  }

  sort(ordering) {
    this.page = 0;
    this.sortParams = this.getConvertOrdering(ordering);
    this.loadContent();
  }

  exportToExcel() {
    return this.http
      .get(API_FEATURES_REQUESTS + `/full-excel`, {
        responseType: 'blob',
        observe: 'response',
        params: this.getParams(),
      })
      .pipe(
        tap((response) => {
          let filename = `export_telecom_journal_${new Date().toLocaleString().slice(0, 10)}.xls`;
          saveAs(response.body, decodeURI(filename));
        }),
      );
  }

  private loadContent(isStack: boolean = false) {
    this.getJournalList().subscribe((response) => {
      if (isStack) {
        this._journalList.next([...this._journalList.getValue(), ...response.content]);
      } else {
        this._journalList.next(response.content);
      }
      this.totalElements = response.totalElements;
    });
  }

  private getJournalList(): Observable<Pageable<LocationFeatureEditingRequestFull[]>> {
    return this.http.get<Pageable<LocationFeatureEditingRequestFull[]>>(
      `${API_FEATURES_REQUESTS}/full`,
      {
        params: this.getParams(),
      },
    );
  }

  private getConvertOrdering(ordering) {
    let params: {[key: string]: string} = {};

    if (ordering.name == '') {
      return params;
    }

    let direction;
    if (ordering.orderingDirection == 0) {
      direction = 'asc';
    } else {
      direction = 'desc';
    }

    params.sort = ordering.name + ',' + direction;

    return params;
  }
}
