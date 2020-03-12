import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {forkJoin, Observable} from 'rxjs';
import {map, share, tap} from 'rxjs/operators';

import {OrderingDirection} from '@core/services/tc-pivots.service';
import {
  GovernmentProgram,
  Location,
  LocationFeatures,
  MobileGeneration,
  Operator,
  PaginatedList,
  TrunkChannel,
} from '@core/models';
import {LocationFeaturesService} from '@core/services/location-features.service';
import {LocationServiceOrganizationAccessPointsWithFilterParams} from '@core/services/location.service';
import {EnumService, GovernmentProgramService} from '@core/services';
import {AutocompleteOptionGroups} from '@shared/layout/nz-autocomplete/grouped-autocomplete.component';
import {locationsToOptionsGroup} from '@core/utils/compare';

export enum FeatureTypes {
  MOBILE = 'mobile',
  INTERNET = 'internet',
}

@Component({
  selector: 'app-technical-capabilities-comparision-table',
  templateUrl: './technical-capabilities-comparision-table.component.html',
  styleUrls: ['./technical-capabilities-comparision-table.component.scss'],
})
export class TechnicalCapabilitiesComparisionTableComponent implements OnInit {
  features$: Observable<PaginatedList<LocationFeatures>>;

  fLocations$: Observable<AutocompleteOptionGroups[]>;

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
  ) {}

  ngOnInit(): void {
    this.buildFeaturesTypeSelector();
    this.buildFilterForm();
    this.currentYear = new Date().getFullYear();
    this.fLocations$ = this.serviceLocation
      .listSimpleLocations()
      .pipe(map(locationsToOptionsGroup));
    this.fParents$ = this.serviceLocation.listParentLocations();
    this.fGovernmentPrograms$ = this.serviceGovernmentProgram.list();

    forkJoin(this.loadInternetProviders(), this.loadMobileProviders()).subscribe(() => {
      this.filterForm.valueChanges.subscribe(value => {
        this.serviceLocationFeatures.filter(value);
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

  exportXLSX(): void {
    if (this.featuresTypeSelector.value === this.featureTypes.INTERNET) {
      this.serviceLocationFeatures.exportExcelInternet();
    } else {
      this.serviceLocationFeatures.exportExcelCellular();
    }
  }

  buildFeaturesTypeSelector(): void {
    this.featuresTypeSelector = this.fb.control('internet');
    this.loadFeatures();

    this.featuresTypeSelector.valueChanges.subscribe(() => {
      this.loadFeatures();
    });
  }

  buildFilterForm(): void {
    this.filterForm = this.fb.group({
      order: [null],
      govProgram: [null],
      location: [null],
      parent: [null],
      internetOperator: [null],
      internetType: [null],
      mobileOperator: [null],
      mobileType: [null],
    });
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.loadFeatures();
  }

  private loadFeatures(): void {
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

  private loadInternetProviders(): Observable<Operator[]> {
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

  private loadMobileProviders(): Observable<Operator[]> {
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
