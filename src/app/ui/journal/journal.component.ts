import {formatDate} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FeatureEdit, FeatureEditAction} from '@api/dto/FeatureEdit';
import {
  ChangeSource,
  LocationFeatureEditingRequestFull,
} from '@api/dto/LocationFeatureEditingRequest';
import {Quality} from '@api/dto/Quality';
import {Signal} from '@api/dto/Signal';
import {UserFromApi} from '@api/dto/UserFromApi';
import { Location} from '@core/models';
import {LocationService} from '@core/services/location.service';
import {UserService} from '@core/services/user.service';
import {JournalService} from '@service/journal/journal.service';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {OrderingFilter} from '../buttons/filter-btn/filter-btn.component';
import {ActionTypeService} from './../old/core/services/action-type.service';
@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
  providers: [JournalService],
})
export class JournalComponent implements OnInit {
  fLocations$: Observable<Location[]>;
  fParents$: Observable<Location[]>;
  factions$: Observable<FeatureEditAction[]>;
  fusers$: Observable<UserFromApi[]>;

  journalList$: Observable<LocationFeatureEditingRequestFull[]> = this.journalService.journalList;

  totalElements: number;
  page = 0;
  size = 10;
  isLoading: boolean;

  form: FormGroup;
  isVisibleFilter = false;
  initialValues;

  ordering: OrderingFilter;

  constructor(
    private locationService: LocationService,
    private userService: UserService,
    private actionTypeService: ActionTypeService,
    private fb: FormBuilder,
    private journalService: JournalService,
  ) {}

  ngOnInit(): void {
    this.fLocations$ = this.locationService.listSimpleLocations();
    this.fParents$ = this.locationService.listParentLocations();
    this.fusers$ = this.userService.getUsers();
    this.factions$ = this.actionTypeService.getActions();
    this.buildForm();

    this.journalService.run(this.page, this.size);
  }

  buildForm(): void {
    this.form = this.fb.group({
      location: null,
      parent: null,
      contractStart: null,
      contractEnd: null,
      action: null,
      user: null,
      logicalCondition: 'AND',
    });

    this.initialValues = this.form.value;

    this.form.valueChanges.subscribe(() => {
      let filterData = this.form.value;

      filterData.contractStart = formatDate(filterData.contractStart, 'yyyy-MM-dd', 'ru-RU');
      filterData.contractEnd = formatDate(filterData.contractEnd, 'yyyy-MM-dd', 'ru-RU');

      this.journalService.filter(filterData);
    });
  }

  signalsToString(tvOrRadioTypes: Signal[]): string {
    if (!tvOrRadioTypes.length) {
      return '';
    }
    return tvOrRadioTypes.map((tvOrRadioType) => tvOrRadioType.name).join(', ');
  }

  onScrollDown(): void {
    this.page = this.page + 1;
    this.journalService.next();
  }

  onSort(ordering) {
    this.ordering = ordering;
    this.journalService.sort(ordering);
  }

  qualityToString(quality: Quality): string {
    switch (quality) {
      case 'GOOD':
        return 'Хорошее';
      case 'NORMAL':
        return 'Удовлетворительно';
      case 'ABSENT':
        return 'Отсутствует';
    }
  }
  changeSourceLabel(changeSource: ChangeSource): string {
    switch (changeSource) {
      case 'EDITING':
        return 'ручной ввод';
      case 'IMPORT':
        return 'импорт';
      case 'REQUEST':
        return 'уточняющая заявка';
      default:
        return 'неизвестно';
    }
  }

  actions(featureEdits: FeatureEdit[]): string {
    return featureEdits
      .map((fe) => {
        switch (fe.action) {
          case 'UPDATE':
            return 'изменение';
          case 'CREATE':
            return 'создание';
          case 'DELETE':
            return 'удаление';
        }
      })
      .filter((value, index, array) => array.indexOf(value) === index)
      .join(', ');
  }

  getAction(key: string): string {
    switch (key) {
      case 'CREATE':
        return 'Подключен';
      case 'DELETE':
        return 'Отключен';
    }
  }

  exportExcel() {
    this.isLoading = true;
    this.journalService
      .exportToExcel()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe();
  }

  getFeatureAction(key: string): string {
    switch (key) {
      case 'CREATE':
        return 'создание';
      case 'DELETE':
        return 'удаление';
      case 'UPDATE':
        return 'изменение';
    }
  }

  getType(key: string): string {
    switch (key) {
      case 'ATS':
        return 'АТС';
      case 'PAYPHONE':
        return 'Таксофоны';
      case 'INFOMAT':
        return 'Инфомат';
      case 'INET':
        return 'Интернет';
      case 'MOBILE':
        return 'Мобильная связь';
      case 'POST':
        return 'Почта';
      case 'RADIO':
        return 'Радио';
      case 'TV':
        return 'ТВ';
    }
  }

  datePlus7(created: string): Date {
    const date = new Date(created);
    date.setHours(date.getHours() + this.getTimezoneOffset());
    return date;
  }

  getTimezoneOffset(): number {
    return -(new Date().getTimezoneOffset() / 60);
  }

  showFilterBody(): void {
    this.isVisibleFilter = !this.isVisibleFilter;
  }

  resetFilters(): void {
    this.form.reset(this.initialValues);
  }
}
