import {Component, OnInit} from '@angular/core';
import {LocationFeaturesService} from '@core/services/location-features.service';
import {GovernmentProgram, Location, LocationFeatures, MobileGeneration, Operator, PaginatedList, TrunkChannel} from '@core/models';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {OrderingDirection} from '@core/services/tc-pivots.service';
import {forkJoin, Observable} from 'rxjs';
import {share, tap} from 'rxjs/operators';
import {LocationServiceOrganizationAccessPointsWithFilterParams} from '@core/services/location.service';
import {EnumService, GovernmentProgramService} from '@core/services';

export enum FeatureTypes {
  MOBILE= 'mobile', INTERNET = 'internet'
}

@Component({
  selector: 'app-technical-capabilities-comparision-table',
  templateUrl: './technical-capabilities-comparision-table.component.html',
  styleUrls: ['./technical-capabilities-comparision-table.component.scss'],
})
export class TechnicalCapabilitiesComparisionTableComponent implements OnInit {
  features$: Observable<PaginatedList<LocationFeatures>>;
  fLocations$: Observable<Location[]>;
  fParents$: Observable<Location[]>;
  fGovernmentPrograms$: Observable<GovernmentProgram[]>;
  featuresTypeSelector: FormControl;
  filterForm: FormGroup;

  featureTypes = FeatureTypes;

  pageNumber = 1;
  itemsPerPage = 10;

  currentYear: number;

  OrderingDirection = OrderingDirection;
  internetProviders: Operator[];
  mobileProviders: Operator[];

  MobileGeneration = MobileGeneration;
  TrunkChannel = TrunkChannel;

  constructor(
    private serviceLocationFeatures: LocationFeaturesService,
    private serviceLocation: LocationServiceOrganizationAccessPointsWithFilterParams,
    private serviceSpinner: NgxSpinnerService,
    private serviceGovernmentProgram: GovernmentProgramService,
    private fb: FormBuilder,
    private enumService: EnumService
  ) {
  }

  ngOnInit() {
    this.buildFeaturesTypeSelector();
    this.buildFilterForm();
    this.currentYear = new Date().getFullYear();
    this.fLocations$ = this.serviceLocation.listSimpleLocations();
    this.fParents$ = this.serviceLocation.listParentLocations();
    this.fGovernmentPrograms$ = this.serviceGovernmentProgram.list();

    forkJoin(
      this.loadInternetProviders(),
      this.loadMobileProviders()
    ).subscribe(() => {
      console.log(this.filterForm);
      this.filterForm.valueChanges.subscribe(value => {
        this.serviceLocationFeatures.filter(value);
        console.log(value);
        this.features$ = (this.featuresTypeSelector.value === this.featureTypes.INTERNET
            ? this.serviceLocationFeatures.paginatedListInternet(this.pageNumber, this.itemsPerPage)
            : this.serviceLocationFeatures.paginatedListCellular(this.pageNumber, this.itemsPerPage)
        ).pipe(
          tap(() => {
            this.serviceSpinner.hide();
          }),
          share()
        );
      });
    });
  }

  exportXLSX() {
    if (this.featuresTypeSelector.value === this.featureTypes.INTERNET) {
      this.serviceLocationFeatures.exportExcelInternet();
    } else {
      this.serviceLocationFeatures.exportExcelCellular();
    }
  }

  buildFeaturesTypeSelector() {
    this.featuresTypeSelector = this.fb.control('internet');
    this.loadFeatures();

    this.featuresTypeSelector.valueChanges.subscribe(() => {
      this.loadFeatures();
    });
  }

  buildFilterForm() {
    this.filterForm = this.fb.group({
      order: [null],
      govProgram: [null],
      location: [null],
      parent: [null],
      internetOperator: [null],
      internetType: [null],
      mobileOperator: [null],
      mobileType: [null]
    });
  }

  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.loadFeatures();
  }

  private loadFeatures() {
    this.serviceSpinner.show();
    this.features$ = (this.featuresTypeSelector.value === this.featureTypes.INTERNET
        ? this.serviceLocationFeatures.paginatedListInternet(this.pageNumber, this.itemsPerPage)
        : this.serviceLocationFeatures.paginatedListCellular(this.pageNumber, this.itemsPerPage)
    ).pipe(
      tap(() => {
        this.serviceSpinner.hide();
      }),
      share()
    );
  }

  private loadInternetProviders() {
    return this.enumService.getInternetProvider().pipe(
      tap(response => {
        this.internetProviders = response;

        const internetArrayControl = this.fb.array([]);
        response.forEach(provider => {
          internetArrayControl.push(
            this.fb.group({
              [provider.id]: false,
            })
          );
        });

        this.filterForm.addControl('internet', internetArrayControl);
      })
    );
  }

  private loadMobileProviders() {
    return this.enumService.getMobileProvider().pipe(
      tap(response => {
        this.mobileProviders = response;

        const mobileArrayControl = this.fb.array([]);

        response.forEach(provider => {
          mobileArrayControl.push(
            this.fb.group({
              [provider.id]: false,
            })
          );
        });

        this.filterForm.addControl('mobile', mobileArrayControl);
      })
    );
  }
}
