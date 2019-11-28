import { Component, OnInit } from '@angular/core';
import { FilterTcPivotsService, FilterType } from '../../service/tc-pivots.service';
import { LocationCapabilities, Provider, TrunkChannelType } from '@shared/models/location-capabilities';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GovProgram, GovProgramService } from '@shared/services/gov-program.service';
import { MailType, MobileGeneration, SignalType } from '@shared/models/enums';
import { EnumService } from '@shared/services/enum.service';
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

  TrunkChannelType = TrunkChannelType;
  FilterType = FilterType;
  SignalType = SignalType;
  MailType = MailType;
  MobileGeneration = MobileGeneration;

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
      program: [null]
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
}
