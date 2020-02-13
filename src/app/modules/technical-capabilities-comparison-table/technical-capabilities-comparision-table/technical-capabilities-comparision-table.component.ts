import {Component, OnInit} from '@angular/core';
import {LocationFeaturesService} from '@core/services/location-features.service';
import {LocationFeatures, PaginatedList} from '@core/models';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {OrderingDirection} from '@core/services/tc-pivots.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-technical-capabilities-comparision-table',
  templateUrl: './technical-capabilities-comparision-table.component.html',
  styleUrls: ['./technical-capabilities-comparision-table.component.scss'],
})
export class TechnicalCapabilitiesComparisionTableComponent implements OnInit {
  isOpenedAccordion: boolean;
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
  ) {

  }

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
    this.featuresTypeSelector = this.fb.control(null);

    this.featuresTypeSelector.valueChanges.subscribe(value => {
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

  private loadFeatures() {
    this.serviceSpinner.show();
    this.features$ = (this.featuresTypeSelector.value === this.featureTypes.internet
      ? this.getPaginatedListOfInternet()
      : this.getPaginatedListOfCellular())
      .pipe(tap(() => {
        this.serviceSpinner.hide();
      }));
  }

  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.features$ = (this.featuresTypeSelector.value === this.featureTypes.internet
      ? this.getPaginatedListOfInternet()
      : this.getPaginatedListOfCellular())
      .pipe(tap(() => {
        this.serviceSpinner.hide();
      }));
  }

  getPaginatedListOfInternet() {
    return this.serviceLocationFeatures.paginatedListInternet(this.pageNumber, this.itemsPerPage);
  }

  getPaginatedListOfCellular() {
    return this.serviceLocationFeatures.paginatedListCellular(this.pageNumber, this.itemsPerPage);
  }
}
