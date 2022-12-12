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
    if (ap?.address !== newAp?.address || (!ap.hasOwnProperty('address') && newAp.hasOwnProperty('address'))) {
      result['address'] = ap?.address;
      result['newAddress'] = newAp.address;
    }
    if ((ap?.point?.lat !== newAp?.point?.lat || ap?.point?.lng !== newAp?.point?.lng) || (!ap.hasOwnProperty('point') && newAp.hasOwnProperty('point'))) {
      result['point'] = ap?.point?.lat + '-' + ap?.point?.lng;
      result['newPoint'] = newAp.point.lat + '-' + newAp.point.lng;
    }
    if (ap.funCustomer !== newAp?.funCustomer || (!ap.hasOwnProperty('funCustomer') && newAp.hasOwnProperty('funCustomer'))) {
      result['funCustomer'] = ap?.funCustomer;
      result['newFunCustomer'] = newAp.funCustomer;
    }
    if (ap?.internetAccess?.id !== newAp?.internetAccess?.id || (!ap.hasOwnProperty('internetAccess') && newAp.hasOwnProperty('internetAccess'))) {
      result['internetAccess'] = ap.internetAccess.name;
      result['newInternetAccess'] = newAp.internetAccess.name;
    }
    if (ap?.declaredSpeed !== newAp?.declaredSpeed || (!ap.hasOwnProperty('declaredSpeed') && newAp.hasOwnProperty('declaredSpeed'))) {
      result['declaredSpeed'] = ap?.declaredSpeed;
      result['newDeclaredSpeed'] = newAp.declaredSpeed;
    }
    if (ap?.contractId !== newAp?.contractId || (!ap.hasOwnProperty('contractId') && newAp.hasOwnProperty('contractId'))) {
      result['contractId'] = ap?.contractId;
      result['newContractId'] = newAp.contractId;
    }
    if (ap?.contract !== newAp?.contract || (!ap.hasOwnProperty('contract') && newAp.hasOwnProperty('contract'))) {
      result['contract'] = ap?.contract;
      result['newContract'] = newAp.contract;
    }
    if (ap?.contacts !== newAp?.contacts || (!ap.hasOwnProperty('contacts') && newAp.hasOwnProperty('contacts'))) {
      result['contacts'] = ap?.contacts;
      result['newContacts'] = newAp.contacts;
    }
    if (ap?.change !== newAp?.change || (!ap.hasOwnProperty('change') && newAp.hasOwnProperty('change'))) {
      result['change'] = ap?.change;
      result['newChange'] = newAp.change;
    }
    if (ap?.dateConnectionOrChange !== newAp?.dateConnectionOrChange || (!ap.hasOwnProperty('dateConnectionOrChange') && newAp.hasOwnProperty('dateConnectionOrChange'))) {
      result['dateConnectionOrChange'] = ap?.dateConnectionOrChange;
      result['newDateConnectionOrChange'] = newAp.dateConnectionOrChange;
    }
    if (ap?.numIncomingMessage !== newAp?.numIncomingMessage || (!ap.hasOwnProperty('numIncomingMessage') && newAp.hasOwnProperty('numIncomingMessage'))) {
      result['numIncomingMessage'] = ap?.numIncomingMessage;
      result['newNumIncomingMessage'] = newAp.numIncomingMessage;
    }
    if (ap?.commentary !== newAp?.commentary || (!ap.hasOwnProperty('commentary') && newAp.hasOwnProperty('commentary'))) {
      result['commentary'] = ap?.commentary;
      result['newCommentary'] = newAp.commentary;
    }
    if (ap?.organization?.id !== newAp?.organization?.id || (!ap.hasOwnProperty('organization') && newAp.hasOwnProperty('organization'))) {
      result['organization'] = ap?.organization.name;
      result['fias'] = ap?.organization.fias;
      result['newOrganization'] = newAp.organization.name;
      result['newFias'] = newAp.organization.fias;
    }
    if (ap?.espdWhiteIp !== newAp?.espdWhiteIp || (!ap.hasOwnProperty('espdWhiteIp') && newAp.hasOwnProperty('espdWhiteIp'))) {
      result['espdWhiteIp'] = ap?.espdWhiteIp;
      result['newEspdWhiteIp'] = newAp.espdWhiteIp;
    }
    if (ap?.numSourceEmailsRTK !== newAp?.numSourceEmailsRTK || (!ap.hasOwnProperty('numSourceEmailsRTK') && newAp.hasOwnProperty('numSourceEmailsRTK'))) {
      result['numSourceEmailsRTK'] = ap?.numSourceEmailsRTK;
      result['newNumSourceEmailsRTK'] = newAp.numSourceEmailsRTK;
    }
    if (ap?.oneTimePay !== newAp?.oneTimePay || (!ap.hasOwnProperty('oneTimePay') && newAp.hasOwnProperty('oneTimePay'))) {
      result['oneTimePay'] = ap?.oneTimePay;
      result['newOneTimePay'] = newAp.oneTimePay;
    }
    if (ap?.monthlyPay !== newAp?.monthlyPay || (!ap.hasOwnProperty('monthlyPay') && newAp.hasOwnProperty('monthlyPay'))) {
      result['monthlyPay'] = ap?.monthlyPay;
      result['newMonthlyPay'] = newAp.monthlyPay;
    }
    if (ap?.zspdWhiteIp !== newAp?.zspdWhiteIp || (!ap.hasOwnProperty('zspdWhiteIp') && newAp.hasOwnProperty('zspdWhiteIp'))) {
      result['zspdWhiteIp'] = ap?.zspdWhiteIp;
      result['newZspdWhiteIp'] = newAp.zspdWhiteIp;
    }
    if (ap?.availZspdOrMethodConToZspd !== newAp?.availZspdOrMethodConToZspd || (!ap.hasOwnProperty('availZspdOrMethodConToZspd') && newAp.hasOwnProperty('availZspdOrMethodConToZspd'))) {
      result['availZspdOrMethodConToZspd'] = ap?.availZspdOrMethodConToZspd;
      result['newAvailZspdOrMethodConToZspd'] = newAp.availZspdOrMethodConToZspd;
    }
    if (ap?.dateCommissioning !== newAp?.dateCommissioning || (!ap.hasOwnProperty('dateCommissioning') && newAp.hasOwnProperty('dateCommissioning'))) {
      result['dateCommissioning'] = ap?.dateCommissioning;
      result['newDateCommissioning'] = newAp.dateCommissioning;
    }

    return result;
  }

  getChangesText(changes : object) : string[] {
    let result : string[] = [];

    if (changes['newAddress']) {
      result.push('Изменен адрес с \"' + (changes['address'] ?? 'нет адреса') + '\" на \"' + changes['newAddress'] + '\";');
    }
    if (changes['newPoint']) {
      result.push('Изменены координаты с \"' + (changes['point'] ?? 'нет координат') + '\" на \"' + changes['newPoint'] + '\";');
    }
    if (changes['newFunCustomer']) {
      result.push('Изменён функциональный заказчик с \"' + (changes['funCustomer'] ?? 'нет заказчика') + '\" на \"' + changes['newFunCustomer'] + '\";');
    }
    if (changes['newInternetAccess']) {
      result.push('Изменён тип подключения с \"' + (changes['internetAccess'] ?? 'нет типа подключения') + '\" на \"' + changes['newInternetAccess'] + '\";');
    }
    if (changes['newDeclaredSpeed']) {
      result.push('Изменена скорость подключения с \"' + (changes['declaredSpeed'] ?? 'нет скорости подключения') + '\" на \"' + changes['newDeclaredSpeed'] + '\";');
    }
    if (changes['newContractId']) {
      result.push('Изменён ID по контракту с \"' + (changes['contractId'] ?? 'нет ID по контракту') + '\" на \"' + changes['newContractId'] + '\";');
    }
    if (changes['newContract']) {
      result.push('Изменён контракт с \"' + (changes['contract'] ?? 'нет контракта') + '\" на \"' + changes['newContract'] + '\";');
    }
    if (changes['newContacts']) {
      result.push('Изменена информация о контактах с \"' + (changes['contacts'] ?? 'нет контактов') + '\" на \"' + changes['newContacts'] + '\";');
    }
    if (changes['newChange']) {
      result.push('Изменён тип изменения с \"' + (changes['change'] ?? 'нет типа изменения') + '\" на \"' + changes['newChange'] + '\";');
    }
    if (changes['newDateConnectionOrChange']) {
      result.push('Изменена дата подключения/изменения с \"' + (changes['dateConnectionOrChange'] ?? 'нет даты подключения/изменения') + '\" на \"' + changes['newDateConnectionOrChange'] + '\";');
    }
    if (changes['newNumIncomingMessage']) {
      result.push('Изменён № вх. письма от ведомства с \"' + (changes['numIncomingMessage'] ?? 'нет номера') + '\" на \"' + changes['newNumIncomingMessage'] + '\";');
    }
    if (changes['newCommentary']) {
      result.push('Изменены комментарии с \"' + (changes['commentary'] ?? 'нет комментариев') + '\" на \"' + changes['newCommentary'] + '\";');
    }
    if (changes['newOrganization']) {
      result.push('Изменено наименование организации с \"' + (changes['organization'] ?? 'нет наименования') + '\" на \"' + changes['newOrganization'] + '\";');
      result.push('Изменён ФИАС организации с \"' + (changes['fias'] ?? 'нет ФИАСа') + '\" на \"' + changes['newFias'] + '\";');
    }
    if (changes['newEspdWhiteIp']) {
      result.push('Изменён белый IP ЕСПД с \"' + (changes['espdWhiteIp'] ?? 'нет IP') + '\" на \"' + changes['newEspdWhiteIp'] + '\";');
    }
    if (changes['newNumSourceEmailsRTK']) {
      result.push('Изменён № исх. письма на РТК с \"' + (changes['numSourceEmailsRTK'] ?? 'нет номера') + '\" на \"' + changes['newNumSourceEmailsRTK'] + '\";');
    }
    if (changes['newOneTimePay']) {
      result.push('Изменён разовый платёж с \"' + (changes['oneTimePay'] ?? 'нет размера платежа') + '\" на \"' + changes['newOneTimePay'] + '\";');
    }
    if (changes['newMonthlyPay']) {
      result.push('Изменен ежемесячный платёж с \"' + (changes['monthlyPay'] ?? 'нет размера платежа') + '\" на \"' + changes['newMonthlyPay'] + '\";');
    }
    if (changes['newZspdWhiteIp']) {
      result.push('Изменён белый IP ЗСПД с \"' + (changes['zspdWhiteIp'] ?? 'нет IP') + '\" на \"' + changes['newZspdWhiteIp'] + '\";');
    }
    if (changes['newAvailZspdOrMethodConToZspd']) {
      result.push('Изменено наличие ЗСПД/способ подключения к ЗСПД с \"' + (changes['availZspdOrMethodConToZspd'] ?? 'нет ЗСПД') + '\" на \"' + changes['newAvailZspdOrMethodConToZspd'] + '\";');
    }
    if (changes['newDateCommissioning']) {
      result.push('Изменена дата ввода в эксплуатацию с \"' + (changes['dateCommissioning'] ?? 'нет даты ввода в эксплуатацию') + '\" на \"' + changes['newDateCommissioning'] + '\";');
    }

    if (!result.length) {
      result.push('Обновление, изменений нет;');
    }

    result[result.length - 1] = result[result.length - 1].slice(0, -1) + '.';
    return result;
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
