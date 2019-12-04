import { Component, Input, OnInit } from '@angular/core';
import { AtsFeature, CellularFeature, LocationFeature, RadioFeature, getStringSignalType } from '@core/models';
import { InternetFeature } from '@core/models/internet-feature';

@Component({
  selector: 'app-providers-row',
  templateUrl: './technical-capabilities-row.component.html'
})
export class TechnicalCapabilitiesRowComponent implements OnInit {

  @Input() locationFeatures: LocationFeature[];

  getStringSignalType = getStringSignalType;

  constructor() {
  }

  ngOnInit() {
  }

  getInternetFeature(locationFeature: LocationFeature): InternetFeature {
    if (locationFeature instanceof InternetFeature) {
      return locationFeature as InternetFeature;
    } else {
      return null;
    }
  }

  getAtsFeature(locationFeature: LocationFeature): AtsFeature {
    if (locationFeature instanceof AtsFeature) {
      return locationFeature as AtsFeature;
    } else {
      return null;
    }
  }

  getCellularFeature(locationFeature: LocationFeature): CellularFeature {
    if (locationFeature instanceof CellularFeature) {
      return locationFeature as CellularFeature;
    } else {
      return null;
    }
  }

  getRadioFeature(locationFeature: LocationFeature): RadioFeature {
    if (locationFeature instanceof RadioFeature) {
      return locationFeature as RadioFeature;
    } else {
      return null;
    }
  }
}
