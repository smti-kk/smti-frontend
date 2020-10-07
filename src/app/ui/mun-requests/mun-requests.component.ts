import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MunRequestComponent} from './mun-request/mun-request.component';
import {LocationsFullInformationService} from '@service/locations';
import {LocationTableItem} from '@service/dto/LocationTableItem';
import {Signal} from '@api/dto/Signal';
import {ApiFeaturesRequests} from '@api/features-requests/ApiFeaturesRequests';
import {LocationFeatureEditingRequest} from '@api/dto/LocationFeatureEditingRequest';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-mun-requests',
  templateUrl: './mun-requests.component.html',
  styleUrls: ['./mun-requests.component.scss']
})
export class MunRequestsComponent implements OnInit {
  locations: LocationTableItem[];
  archiveRequests: LocationFeatureEditingRequest[];
  totalElements: number;
  page = 0;
  size = 6;

  constructor(
    private readonly matDialog: MatDialog,
    private readonly locationService: LocationsFullInformationService,
    private readonly requestsService: ApiFeaturesRequests,
    private readonly snackBar: MatSnackBar
  ) {
    this.requestsService.requestsByUser(this.page, this.size).subscribe(requests => {
      this.archiveRequests = requests.content;
      this.totalElements = requests.totalElements;
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

  onScrollDown(): void {
    this.page = this.page + 1;
    this.requestsService.requestsByUser(this.page, this.size).subscribe(requests => {
      this.archiveRequests = [...this.archiveRequests, ...requests.content];
      this.totalElements = requests.totalElements;
    });
  }

  showDeclineComment(declineComment: string): void {
    this.snackBar.open(declineComment, 'Закрыть');
  }
}
