import {Component, OnInit} from '@angular/core';
import {LocationFeaturesService} from '@core/services/location-features.service';
import {LocationFeatures} from '@core/models';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {OrderingDirection} from '@core/services/tc-pivots.service';

@Component({
  selector: 'app-technical-capabilities-comparision-table',
  templateUrl: './technical-capabilities-comparision-table.component.html',
  styleUrls: ['./technical-capabilities-comparision-table.component.scss'],
})
export class TechnicalCapabilitiesComparisionTableComponent implements OnInit {
  isOpenedAccordion: boolean;
  featuresInternet: LocationFeatures[];
  featuresCellular: LocationFeatures[];
  featuresTypeSelector: FormControl;
  filterForm: FormGroup;
  featureTypes = {
    mobile: 'mobile',
    internet: 'internet',
  };
  itemsPerPage = 10;
  pageNumber = 1;
  OrderingDirection = OrderingDirection;

  constructor(
    private locationFeaturesService: LocationFeaturesService,
    private spinnerService: NgxSpinnerService,
    private fb: FormBuilder
  ) {
    this.buildFeaturesTypeSelector();
    this.buildFilterForm();
  }

  ngOnInit() {}

  exportXLSX() {
    if (this.featuresTypeSelector.value === this.featureTypes.internet) {
      this.locationFeaturesService.exportExcelInternet();
    } else {
      this.locationFeaturesService.exportExcelCellular();
    }
  }

  buildFeaturesTypeSelector() {
    this.featuresTypeSelector = this.fb.control(null);

    this.featuresTypeSelector.valueChanges.subscribe(value => {
      if (value === this.featureTypes.internet) {
        this.loadInternetFeatures();
      } else if (value === this.featureTypes.mobile) {
        this.loadMobileFeatures();
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
    this.spinnerService.show();
    this.locationFeaturesService.internetFeaturesList().subscribe(value => {
      this.featuresInternet = value;
      this.spinnerService.hide();
    });
  }

  private loadMobileFeatures() {
    this.spinnerService.show();
    this.locationFeaturesService.cellularFeaturesList().subscribe(value => {
      this.featuresCellular = value;
      this.spinnerService.hide();
    });
  }
}
