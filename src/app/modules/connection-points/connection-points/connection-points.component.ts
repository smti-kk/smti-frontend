import { Component, OnInit } from '@angular/core';
import { LocationService } from '@core/services/location.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@core/models';

@Component({
  selector: 'app-connection-points',
  templateUrl: './connection-points.component.html',
  styleUrls: ['./connection-points.component.scss']
})
export class ConnectionPointsComponent implements OnInit {

  locations: Location[];

  constructor(private locationService: LocationService,
              private spinnerService: NgxSpinnerService) {
    spinnerService.show();
    locationService.listLocationsWithConnectionPoints()
      .subscribe(locations => {
        this.locations = locations;
        console.log(locations);
        spinnerService.hide();
      });
  }

  ngOnInit() {
  }

}
