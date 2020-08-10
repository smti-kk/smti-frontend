import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MunRequestComponent} from './mun-request/mun-request.component';
import {LocationsFullInformationService} from '@service/locations';
import {LocationTableItem} from '@service/dto/LocationTableItem';
import {Signal} from '@api/dto/Signal';
import {ApiFeaturesRequests} from '@api/features-requests/ApiFeaturesRequests';
import {LocationFeatureEditingRequest} from '@api/dto/LocationFeatureEditingRequest';

@Component({
  selector: 'app-mun-requests',
  templateUrl: './mun-requests.component.html',
  styleUrls: ['./mun-requests.component.scss']
})
export class MunRequestsComponent implements OnInit {
  locations: LocationTableItem[];
  archiveRequests: LocationFeatureEditingRequest[];

  constructor(
    private readonly matDialog: MatDialog,
    private locationService: LocationsFullInformationService,
    private readonly requestsService: ApiFeaturesRequests,
  ) {
    this.requestsService.requestsByUser().subscribe(requests => {
      this.archiveRequests = requests;
    });
  }

  ngOnInit(): void {
    this.locationService.listByUser().subscribe(locations => this.locations = locations);
  }

  sendRequest(locationId: number): void {
    this.matDialog.open(MunRequestComponent, {height: '600px', minWidth: '800px', data: locationId});
  }

  signalsToString(tvOrRadioTypes: Signal[]): string {
    return tvOrRadioTypes.map(tvOrRadioType => tvOrRadioType.name).join(', ');
  }
}
