import { Component, OnInit } from '@angular/core';
import { FilterTcPivotsService, FilterType } from '../../service/tc-pivots.service';
import { LocationCapabilities, Provider, TrunkChannelType } from '@shared/models/location-capabilities';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GovProgram, GovProgramService } from '@shared/services/gov-program.service';
import { MailType, MobileGeneration, SignalType } from '@shared/models/enums';
import { EnumService } from '@shared/services/enum.service';
import { Subscription } from 'rxjs';

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

  constructor(private tcPivots: FilterTcPivotsService,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private govProgramsService: GovProgramService,
              private enumService: EnumService) {
    this.loadPivotsTable();
    this.loadGovPrograms();
    this.loadInternetProviders();
    this.loadMobileProviders();
    this.buildForm();
  }

  ngOnInit() {
  }

  private loadPivotsTable() {
    this.spinner.show();
    this.tcPivots.list().subscribe(lcs => {
      this.lcs = lcs;
      this.spinner.hide();
    });
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

    this.observer = this.filterForm
      .valueChanges
      .subscribe(value => {
        this.tcPivots.filter(value);
        this.loadPivotsTable();
      });
  }

  private loadGovPrograms() {
    this.govProgramsService.list()
      .subscribe(govPrograms => this.govPrograms = govPrograms);
  }

  private loadInternetProviders() {
    this.enumService
      .getInternetProvider()
      .subscribe((response) => {
        this.internetProviders = response;

        const internetArrayControl = this.fb.array([]);
        response.forEach(provider => {
          internetArrayControl.push(this.fb.group({
            [provider.id]: false
          }));
        });

        this.filterForm.addControl('internet', internetArrayControl);
      });
  }

  private loadMobileProviders() {
    this.enumService
      .getMobileProvider()
      .subscribe((response) => {
        this.mobileProviders = response;

        const mobileArrayControl = this.fb.array([]);

        response.forEach(provider => {
          mobileArrayControl.push(this.fb.group({
            [provider.id]: false
          }));
        });

        this.filterForm.addControl('mobile', mobileArrayControl);
      });
  }
}
