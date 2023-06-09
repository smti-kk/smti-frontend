import {Component, OnInit} from '@angular/core';
import {ChangeSource, LocationFeatureEditingRequestFull} from '@api/dto/LocationFeatureEditingRequest';
import {MatDialog} from '@angular/material/dialog';
import {LocationsFullInformationService} from '@service/locations';
import {ApiFeaturesRequests} from '@api/features-requests/ApiFeaturesRequests';
import {Signal} from '@api/dto/Signal';
import {ReqDeclineFormComponent} from './req-decline-form/req-decline-form.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Quality} from '@api/dto/Quality';
import {Observable} from 'rxjs';
import {Pageable} from '@api/dto/Pageable';
import {FeatureEdit} from '@api/dto/FeatureEdit';

@Component({
  selector: 'app-oper-profile',
  templateUrl: './oper-profile.component.html',
  styleUrls: ['./oper-profile.component.scss']
})
export class OperProfileComponent implements OnInit {
  archiveRequests: LocationFeatureEditingRequestFull[];
  totalElements: number;
  page = 0;
  size = 10;

  constructor(
    private readonly matDialog: MatDialog,
    private locationService: LocationsFullInformationService,
    private readonly requestsService: ApiFeaturesRequests,
    private readonly snackBar: MatSnackBar
  ) {
    this.requests(this.page, this.size).subscribe(requests => {
      this.archiveRequests = requests.content;
      this.totalElements = requests.totalElements;
    });
  }

  ngOnInit(): void {
  }

  signalsToString(tvOrRadioTypes: Signal[]): string {
    return tvOrRadioTypes.map(tvOrRadioType => tvOrRadioType.name).join(', ');
  }

  acceptReq(request: LocationFeatureEditingRequestFull): void {
    this.requestsService.accept(request.id).subscribe(() => request.status = 'ACCEPTED');
  }

  declineReq(request: LocationFeatureEditingRequestFull): void {
    const matDialogRef = this.matDialog.open(ReqDeclineFormComponent);
    matDialogRef.afterClosed().subscribe(comment => {
      if (comment) {
        this.requestsService.decline(request.id, comment).subscribe();
        request.status = 'DECLINED';
      }
    });
  }

  onScrollDown(): void {
    this.page = this.page + 1;
    this.requests(this.page, this.size).subscribe(requests => {
      this.archiveRequests = [...this.archiveRequests, ...requests.content];
      this.totalElements = requests.totalElements;
    });
  }

  showDeclineComment(declineComment: string): void {
    this.snackBar.open(declineComment, 'Закрыть');
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

  requests(page: number, size: number): Observable<Pageable<LocationFeatureEditingRequestFull[]>> {
    if (this.isJournal()) {
      return this.requestsService.requestsAndImportsAndEditions(page, size);
    } else {
      return this.requestsService.requests(page, size);
    }
  }

  isJournal(): boolean {
    return window.location.pathname.includes('journal');
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
    return featureEdits.map(fe => {
      switch (fe.action) {
        case 'UPDATE':
          return 'изменение';
        case 'CREATE':
          return 'создание';
        case 'DELETE':
          return 'удаление';
      }
    }).filter(((value, index, array) => array.indexOf(value) === index))
      .join(', ');
  }

  datePlus7(created: string): Date {
    const date = new Date(created);
    date.setHours(date.getHours() + this.getTimezoneOffset());
    return date;
  }

  getTimezoneOffset(): number {
    return -(new Date().getTimezoneOffset() / 60);
  }
}
