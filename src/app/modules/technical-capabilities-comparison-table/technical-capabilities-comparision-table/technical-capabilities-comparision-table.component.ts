import {Component, OnInit} from '@angular/core';
import {LocationFeaturesService} from '@core/services/location-features.service';
import {LocationFeatures, PaginatedList} from '@core/models';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {OrderingDirection} from '@core/services/tc-pivots.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-technical-capabilities-comparision-table',
  templateUrl: './technical-capabilities-comparision-table.component.html',
  styleUrls: ['./technical-capabilities-comparision-table.component.scss'],
})
export class TechnicalCapabilitiesComparisionTableComponent implements OnInit {
  isOpenedAccordion: boolean;
  featuresInternet$: Observable<PaginatedList<LocationFeatures>>;
  featuresCellular$: Observable<PaginatedList<LocationFeatures>>;
  featuresTypeSelector: FormControl;
  filterForm: FormGroup;
  featureTypes = {
    mobile: 'mobile',
    internet: 'internet',
  };

  pageNumber = 1;
  itemsPerPage = 10;

  OrderingDirection = OrderingDirection;

  constructor(
    private serviceLocationFeatures: LocationFeaturesService,
    private serviceSpinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {
    this.buildFeaturesTypeSelector();
    this.buildFilterForm();
  }

  ngOnInit() {}

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
      if (value === this.featureTypes.internet) {
        this.loadInternetFeatures();
      } else if (value === this.featureTypes.mobile) {
        // this.loadMobileFeatures();
      }
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

  private loadInternetFeatures() {
    this.serviceSpinner.show();
    this.featuresInternet$ = this.getPaginatedListOfInternet();
  }

  // private loadMobileFeatures() {
  //   this.serviceSpinner.show();
  //   this.serviceLocationFeatures.getCellularFeaturesList().subscribe(value => {
  //     this.featuresCellular$ = value;
  //     this.serviceSpinner.hide();
  //   });
  // }
  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.featuresInternet$ = this.getPaginatedListOfInternet();
  }
  getPaginatedListOfInternet() {
    return this.serviceLocationFeatures.paginatedListInternet(this.pageNumber, this.itemsPerPage);
  }
}
