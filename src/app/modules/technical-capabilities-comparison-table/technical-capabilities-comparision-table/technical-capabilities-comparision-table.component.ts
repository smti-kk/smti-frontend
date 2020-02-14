import {Component, OnInit} from '@angular/core';
import {LocationFeaturesService} from '@core/services/location-features.service';
import {LocationFeatures, PaginatedList} from '@core/models';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {OrderingDirection} from '@core/services/tc-pivots.service';
import {Observable} from 'rxjs';
import {share, tap} from 'rxjs/operators';

@Component({
  selector: 'app-technical-capabilities-comparision-table',
  templateUrl: './technical-capabilities-comparision-table.component.html',
  styleUrls: ['./technical-capabilities-comparision-table.component.scss'],
})
export class TechnicalCapabilitiesComparisionTableComponent implements OnInit {
  features$: Observable<PaginatedList<LocationFeatures>>;
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
    private serviceSpinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildFeaturesTypeSelector();
    this.buildFilterForm();
    this.currentYear = new Date().getFullYear();
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
      locationName: [null],
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
