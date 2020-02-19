import {Component, OnInit} from '@angular/core';
import {LocationFeaturesService} from '@core/services/location-features.service';
import {GovernmentProgram, Location, LocationFeatures, PaginatedList} from '@core/models';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {OrderingDirection} from '@core/services/tc-pivots.service';
import {Observable} from 'rxjs';
import {share, tap} from 'rxjs/operators';
import {LocationServiceOrganizationAccessPointsWithFilterParams} from '@core/services/location.service';
import {GovernmentProgramService} from '@core/services';

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
  featureTypes = {
    mobile: 'mobile',
    internet: 'internet',
  };

  pageNumber = 1;
  itemsPerPage = 10;

  currentYear: number;

  OrderingDirection = OrderingDirection;

  constructor(
    private serviceLocationFeatures: LocationFeaturesService,
    private serviceLocation: LocationServiceOrganizationAccessPointsWithFilterParams,
    private serviceSpinner: NgxSpinnerService,
    private serviceGovernmentProgram: GovernmentProgramService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildFeaturesTypeSelector();
    this.buildFilterForm();
    this.currentYear = new Date().getFullYear();
    this.fLocations$ = this.serviceLocation.listSimpleLocations();
    this.fParents$ = this.serviceLocation.listParentLocations();
    this.fGovernmentPrograms$ = this.serviceGovernmentProgram.list();
  }

  exportXLSX() {
    if (this.featuresTypeSelector.value === this.featureTypes.internet) {
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

    this.filterForm.valueChanges.subscribe(v => {
      // this.serviceLocation.filter(v);
      // this.locations$ = this.loadPagedLocationWithOrganizationAccessPoints();
      this.features$ = (this.featuresTypeSelector.value === this.featureTypes.internet
          ? this.serviceLocationFeatures.paginatedListInternet(this.pageNumber, this.itemsPerPage)
          : this.serviceLocationFeatures.paginatedListCellular(this.pageNumber, this.itemsPerPage)
      ).pipe(
        tap(() => {
          this.serviceSpinner.hide();
        }),
        share()
      );
    });
  }

  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.loadFeatures();
  }

  private loadFeatures() {
    this.serviceSpinner.show();
    this.features$ = (this.featuresTypeSelector.value === this.featureTypes.internet
        ? this.serviceLocationFeatures.paginatedListInternet(this.pageNumber, this.itemsPerPage)
        : this.serviceLocationFeatures.paginatedListCellular(this.pageNumber, this.itemsPerPage)
    ).pipe(
      tap(() => {
        this.serviceSpinner.hide();
      }),
      share()
    );
  }
}
