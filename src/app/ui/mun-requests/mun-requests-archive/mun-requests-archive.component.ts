import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LocationFeatureEditingRequest} from '@api/dto/LocationFeatureEditingRequest';
import {Signal} from '@api/dto/Signal';
import {ApiFeaturesRequests} from '@api/features-requests/ApiFeaturesRequests';
import {MunFilters} from './../mun-requests-filters/MunFilters';

@Component({
  selector: 'app-mun-requests-archive',
  templateUrl: './mun-requests-archive.component.html',
  styleUrls: ['./mun-requests-archive.component.scss'],
})
export class MunRequestsArchiveComponent implements OnInit {
  archiveRequests: LocationFeatureEditingRequest[];
  totalElements: number;
  page = 0;
  size = 6;
  filters: MunFilters = null;

  constructor(
    private readonly requestsService: ApiFeaturesRequests,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.requestsService.requestsByUser(this.page, this.size).subscribe((requests) => {
      this.archiveRequests = requests.content;
      this.totalElements = requests.totalElements;
    });
  }

  onScrollDown(): void {
    this.page = this.page + 1;
    this.requestsService.requestsByUser(this.page, this.size, this.filters).subscribe((requests) => {
      this.archiveRequests = [...this.archiveRequests, ...requests.content];
      this.totalElements = requests.totalElements;
    });
  }


  setFilter(filters: MunFilters): void {
    this.filters = filters;
    this.page = 0;
    this.requestsService.requestsByUser(this.page, this.size, this.filters).subscribe((requests) => {
      this.archiveRequests = requests.content;
      this.totalElements = requests.totalElements;
    });
  }

  signalsToString(tvOrRadioTypes: Signal[]): string {
    return tvOrRadioTypes.map((tvOrRadioType) => tvOrRadioType.name).join(', ');
  }

  showDeclineComment(declineComment: string): void {
    this.snackBar.open(declineComment, 'Закрыть');
  }
}
