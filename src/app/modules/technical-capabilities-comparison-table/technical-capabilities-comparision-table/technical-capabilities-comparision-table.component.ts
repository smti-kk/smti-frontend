import { Component, OnInit } from '@angular/core';
import { LocationFeaturesService } from '@core/services/location-features.service';
import { LocationFeatures } from '@core/models';

@Component({
  selector: 'app-technical-capabilities-comparision-table',
  templateUrl: './technical-capabilities-comparision-table.component.html',
  styleUrls: ['./technical-capabilities-comparision-table.component.scss']
})
export class TechnicalCapabilitiesComparisionTableComponent implements OnInit {
  isOpenedAccordion: boolean;
  features: LocationFeatures[];

  constructor(private locationFeaturesService: LocationFeaturesService) {
    locationFeaturesService.list()
      .subscribe(features => {
        console.log(features);
        this.features = features;
      });
  }

  ngOnInit() {
  }

}
