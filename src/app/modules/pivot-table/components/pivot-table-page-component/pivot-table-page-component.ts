import { Component, OnInit } from '@angular/core';
import { FilterTcPivotsService, OrderingDirection } from '../../service/tc-pivots.service';
import { LocationCapabilities, MailType, MobileGenerationType, Provider, SignalType, TrunkChannelType } from '@core/models';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EnumService, GovProgram, GovProgramService } from '@core/services';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-pivot-table-page-component',
  templateUrl: './pivot-table-page-component.html',
  styleUrls: ['./pivot-table-page-component.scss']
})
export class PivotTablePageComponent implements OnInit {

  lcs: LocationCapabilities[];
  govPrograms: GovProgram[];
  pageNumber = 1;
  itemsPerPage = 10;
  isOpenedAccordion = false;
  isOpenedTooltip = false;

  TrunkChannelType = TrunkChannelType;
  OrderingDirection = OrderingDirection;
  SignalType = SignalType;
  MailType = MailType;
  MobileGenerationType = MobileGenerationType;

  internetProviders: Provider[];
  mobileProviders: Provider[];

  filterForm: FormGroup;
  private observer: Subscription;

  constructor(public tcPivots: FilterTcPivotsService,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private govProgramsService: GovProgramService,
              private enumService: EnumService) {
    this.buildForm();

    forkJoin(
      this.loadPivotsTable(),
      this.loadGovPrograms(),
      this.loadInternetProviders(),
      this.loadMobileProviders()
    ).subscribe(() => {
      this.observer = this.filterForm
        .valueChanges
        .subscribe(value => {
          this.tcPivots.filter(value);
          this.loadPivotsTable()
            .subscribe();
        });
    });
  }

  ngOnInit() {
  }

  private loadPivotsTable() {
    this.spinner.show();
    return this.tcPivots.list()
      .pipe(tap(lcs => {
        this.lcs = lcs;
        this.spinner.hide();
      }));
  }

  private buildForm() {
    this.filterForm = this.fb.group({
      order: [null],
      hasEspd: [false],
      hasPayphone: [false],
      hasInfomat: [false],
      hasRadio: [false],
      hasTelephone: [false],
      mailType: [null],
      tvType: [null],
      mobileType: [null],
      internetType: [null],
      program: [null],
      locationName: [null]
    });
  }

  private loadGovPrograms() {
    return this.govProgramsService.list()
      .pipe(tap(govPrograms => this.govPrograms = govPrograms));
  }

  private loadInternetProviders() {
    return this.enumService
      .getInternetProvider()
      .pipe(tap((response) => {
        this.internetProviders = response;

        const internetArrayControl = this.fb.array([]);
        response.forEach(provider => {
          internetArrayControl.push(this.fb.group({
            [provider.id]: false
          }));
        });

        this.filterForm.addControl('internet', internetArrayControl);
      }));
  }

  private loadMobileProviders() {
    return this.enumService
      .getMobileProvider()
      .pipe(tap((response) => {
        this.mobileProviders = response;

        const mobileArrayControl = this.fb.array([]);

        response.forEach(provider => {
          mobileArrayControl.push(this.fb.group({
            [provider.id]: false
          }));
        });

        this.filterForm.addControl('mobile', mobileArrayControl);
      }));
  }

  getTvTypeString(types: { type: SignalType; name: string }[]) {
    if (!types) {
      return '';
    }
    return types
      .map(type => type.name)
      .join(',');
  }
}
