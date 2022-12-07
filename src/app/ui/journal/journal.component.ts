import {formatDate} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FeatureEdit, FeatureEditAction} from '@api/dto/FeatureEdit';
import {
  ChangeSource,
  LocationFeatureEditingRequestFull,
} from '@api/dto/LocationFeatureEditingRequest';
import {Quality} from '@api/dto/Quality';
import { FCAccessPoint } from '@api/dto/ShortAccessPoint';
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

  loadingOnScroll = false;
  loadingThrottle = 300;

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
  //багфикс: используем кастомный throttle вместо встроенного в 'infinite-scroller' для 100% вызова события

    if (!this.loadingOnScroll) {
      this.loadingOnScroll = true;
      window.setTimeout(() => {
        this.journalService.next();
        this.loadingOnScroll = false;
      }, this.loadingThrottle);
   }
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

  getAction(key: string, isAp : boolean): string {
    let result;
    switch (key) {
      case 'CREATE':
        result = 'Подключен';
        break;
      case 'DELETE':
        result = 'Отключен';
        break;
    }
    return result + (isAp ? 'а' : '');
  }

  getChangesInAp(ap : FCAccessPoint | null, newAp : FCAccessPoint | null) : object {
    if (!ap || !newAp) {
      return null;
    }

    let result = {};
    
    if (ap?.address !== newAp?.address) {
      result['address'] = ap.address;
      result['newAddress'] = newAp.address;
    }
    if (ap?.point?.lat !== newAp?.point?.lat || ap?.point?.lng !== newAp?.point?.lng) {
      result['point'] = ap.point.lat + '-' + ap.point.lng;
      result['newPoint'] = newAp.point.lat + '-' + newAp.point.lng;
    }
    if (ap?.funCustomer !== newAp?.funCustomer) {
      result['funCustomer'] = ap.funCustomer;
      result['newFunCustomer'] = newAp.funCustomer;
    }
    if (ap?.internetAccess?.id !== newAp?.internetAccess?.id) {
      result['internetAccess'] = ap.internetAccess.name;
      result['newInternetAccess'] = newAp.internetAccess.name;
    }
    if (ap?.declaredSpeed !== newAp?.declaredSpeed) {
      result['declaredSpeed'] = ap.declaredSpeed;
      result['newDeclaredSpeed'] = newAp.declaredSpeed;
    }
    if (ap?.contractId !== newAp?.contractId) {
      result['contractId'] = ap.contractId;
      result['newContractId'] = newAp.contractId;
    }
    if (ap?.contract !== newAp?.contract) {
      result['contract'] = ap.contract;
      result['newContract'] = newAp.contract;
    }
    if (ap?.contacts !== newAp?.contacts) {
      result['contacts'] = ap.contacts;
      result['newContacts'] = newAp.contacts;
    }
    if (ap?.change !== newAp?.change) {
      result['change'] = ap.change;
      result['newChange'] = newAp.change;
    }
    if (ap?.dateConnectionOrChange !== newAp?.dateConnectionOrChange) {
      result['dateConnectionOrChange'] = ap.dateConnectionOrChange;
      result['newDateConnectionOrChange'] = newAp.dateConnectionOrChange;
    }
    if (ap?.numIncomingMessage !== newAp?.numIncomingMessage) {
      result['numIncomingMessage'] = ap.numIncomingMessage;
      result['newNumIncomingMessage'] = newAp.numIncomingMessage;
    }
    if (ap?.commentary !== newAp?.commentary) {
      result['commentary'] = ap.commentary;
      result['newCommentary'] = newAp.commentary;
    }
    if (ap?.organization?.id !== newAp?.organization?.id) {
      result['organization'] = ap.organization.name;
      result['fias'] = ap.organization.fias;
      result['newOrganization'] = newAp.organization.name;
      result['newFias'] = newAp.organization.fias;
    }
    if (ap?.espdWhiteIp !== newAp?.espdWhiteIp) {
      result['espdWhiteIp'] = ap.espdWhiteIp;
      result['newEspdWhiteIp'] = newAp.espdWhiteIp;
    }
    if (ap?.numSourceEmailsRTK !== newAp?.numSourceEmailsRTK) {
      result['numSourceEmailsRTK'] = ap.numSourceEmailsRTK;
      result['newNumSourceEmailsRTK'] = newAp.numSourceEmailsRTK;
    }
    if (ap?.oneTimePay !== newAp?.oneTimePay) {
      result['oneTimePay'] = ap.oneTimePay;
      result['newOneTimePay'] = newAp.oneTimePay;
    }
    if (ap?.monthlyPay !== newAp?.monthlyPay) {
      result['monthlyPay'] = ap.monthlyPay;
      result['newMonthlyPay'] = newAp.monthlyPay;
    }
    if (ap?.zspdWhiteIp !== newAp?.zspdWhiteIp) {
      result['zspdWhiteIp'] = ap.zspdWhiteIp;
      result['newZspdWhiteIp'] = newAp.zspdWhiteIp;
    }
    if (ap?.availZspdOrMethodConToZspd !== newAp?.availZspdOrMethodConToZspd) {
      result['availZspdOrMethodConToZspd'] = ap.availZspdOrMethodConToZspd;
      result['newAvailZspdOrMethodConToZspd'] = newAp.availZspdOrMethodConToZspd;
    }
    if (ap?.dateCommissioning !== newAp?.dateCommissioning) {
      result['dateCommissioning'] = ap.dateCommissioning;
      result['newDateCommissioning'] = newAp.dateCommissioning;
    }

    return result;
  }

  getChangesText(changes : object) : string {
    let result : string = '';

    if (changes['address']) {
      result += 'Изменен адрес с ' + changes['address'] + ' на ' + changes['newAddress'] + ';';
    }
    if (changes['point']) {
      result += 'Изменены координаты с ' + changes['point'] + ' на ' + changes['newPoint'] + ';';
    }
    if (changes['funCustomer']) {
      result += 'Изменён функциональный заказчик с ' + changes['funCustomer'] + ' на ' + changes['newFunCustomer'] + ';';
    }
    if (changes['internetAccess']) {
      result += 'Изменён тип подключения с ' + changes['internetAccess'] + ' на ' + changes['newInternetAccess'] + ';';
    }
    if (changes['declaredSpeed']) {
      result += 'Изменена скорость подключения с ' + changes['declaredSpeed'] + ' на ' + changes['newDeclaredSpeed'] + ';';
    }
    if (changes['contractId']) {
      result += 'Изменён ID по контракту с ' + changes['contractId'] + ' на ' + changes['newContractId'] + ';';
    }
    if (changes['contract']) {
      result += 'Изменён контракт с ' + changes['contract'] + ' на ' + changes['newContract'] + ';';
    }
    if (changes['contacts']) {
      result += 'Изменена информация о контактах с \"' + changes['contacts'] + '\" на \"' + changes['newContacts'] + '\";';
    }
    if (changes['change']) {
      result += 'Изменён тип изменения с ' + changes['change'] + ' на ' + changes['newChange'] + ';';
    }
    if (changes['dateConnectionOrChange']) {
      result += 'Изменена дата подключения/изменения с ' + changes['dateConnectionOrChange'] + ' на ' + changes['newDateConnectionOrChange'] + ';';
    }
    if (changes['numIncomingMessage']) {
      result += 'Изменён № вх. письма от ведомства с ' + changes['numIncomingMessage'] + ' на ' + changes['newNumIncomingMessage'] + ';';
    }
    if (changes['commentary']) {
      result += 'Изменены комментарии с \"' + changes['commentary'] + '\" на \"' + changes['newCommentary'] + '\";';
    }
    if (changes['organization']) {
      result += 'Изменено наименование организации с \"' + changes['organization'] + '\" на \"' + changes['newOrganization'] + '\";';
      result += 'Изменён ФИАС организации с \"' + changes['fias'] + '\" на \"' + changes['newFias'] + '\";';
    }
    if (changes['espdWhiteIp']) {
      result += 'Изменён белый IP ЕСПД с \"' + changes['espdWhiteIp'] + '\" на \"' + changes['newEspdWhiteIp'] + '\";';
    }
    if (changes['numSourceEmailsRTK']) {
      result += 'Изменён № исх. письма на РТК с \"' + changes['numSourceEmailsRTK'] + '\" на \"' + changes['newNumSourceEmailsRTK'] + '\";';
    }
    if (changes['oneTimePay']) {
      result += 'Изменён разовый платёж с ' + changes['oneTimePay'] + ' на ' + changes['newOneTimePay'] + ';';
    }
    if (changes['monthlyPay']) {
      result += 'Изменен ежемесячный платёж с ' + changes['monthlyPay'] + ' на ' + changes['newMonthlyPay'] + ';';
    }
    if (changes['zspdWhiteIp']) {
      result += 'Изменён белый IP ЗСПД с ' + changes['zspdWhiteIp'] + ' на ' + changes['newZspdWhiteIp'] + ';';
    }
    if (changes['availZspdOrMethodConToZspd']) {
      result += 'Изменено наличие ЗСПД/способ подключения к ЗСПД с ' + changes['availZspdOrMethodConToZspd'] + ' на ' + changes['newAvailZspdOrMethodConToZspd'] + ';';
    }
    if (changes['dateCommissioning']) {
      result += 'Изменена дата ввода в эксплуатацию с ' + changes['dateCommissioning'] + ' на ' + changes['newDateCommissioning'] + ';';
    }

    if (result === '') {
      result += 'Обновление, изменений нет;';
    }

    return result.substring(0, result.length - 1) + '.';
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

  getTcType(key: string): string {
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

  getApType(key : string) : string {
    switch (key) {
      case 'ESPD':
        return 'Точка подключения ЕСПД';
      case 'SMO':
        return 'Точка подключения СЗО';
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
