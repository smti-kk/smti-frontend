import { Component, OnInit } from '@angular/core';
import { LocationFeaturesService } from '@core/services/location-features.service';
import { LocationFeatures } from '@core/models';
import { forkJoin } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-technical-capabilities-comparision-table',
  templateUrl: './technical-capabilities-comparision-table.component.html',
  styleUrls: ['./technical-capabilities-comparision-table.component.scss']
})
export class TechnicalCapabilitiesComparisionTableComponent implements OnInit {
  isOpenedAccordion: boolean;
  featuresInternet: LocationFeatures[];
  featuresCellular: LocationFeatures[];
  featuresTypeSelector: FormControl;
  filterForm: FormGroup;
  featureTypes = {
    mobile: 'mobile',
    internet: 'internet'
  };

  constructor(private locationFeaturesService: LocationFeaturesService,
              private spinnerService: NgxSpinnerService,
              private fb: FormBuilder) {
    spinnerService.show();
    forkJoin(
      locationFeaturesService.internetFeaturesList(),
      locationFeaturesService.cellularFeaturesList()
    ).subscribe(response => {
      this.featuresInternet = response[0];
      this.featuresCellular = response[1];
      spinnerService.hide();
    });

    this.buildFeaturesTypeSelector();
    this.buildFilterForm();
  }

  ngOnInit() {
  }

  exportXLSX() {
    if (this.featuresTypeSelector.value === this.featureTypes.internet) {
      this.locationFeaturesService.exportExcelInternet();
    } else {
      this.locationFeaturesService.exportExcelCellular();
    }
  }

  buildFeaturesTypeSelector() {
    this.featuresTypeSelector = this.fb.control(this.featureTypes.internet);
  }

  buildFilterForm() {
    this.filterForm = this.fb.group({});
  }
}
