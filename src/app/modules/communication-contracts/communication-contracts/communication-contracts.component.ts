import {Component} from '@angular/core';
import {LocationService} from '@core/services/location.service';
import {Location} from '@core/models';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-communication-contracts',
  templateUrl: './communication-contracts.component.html',
  styleUrls: ['./communication-contracts.component.scss'],
})
export class CommunicationContractsComponent {
  locations: Location[];

  constructor(private locationService: LocationService, private spinnerService: NgxSpinnerService) {
    spinnerService.show();
    locationService.list().subscribe(locations => {
      this.locations = locations;
      console.log(locations);
      console.log(locations.filter(l => l.organizations.find(o => o.contracts.length > 0)));
      spinnerService.hide();
    });
  }
}
