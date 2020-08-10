import { Component, OnInit } from '@angular/core';
import {LocationTableItem} from '@service/dto/LocationTableItem';
import {LocationFeatureEditingRequest, LocationFeatureEditingRequestFull} from '@api/dto/LocationFeatureEditingRequest';
import {MatDialog} from '@angular/material/dialog';
import {LocationsFullInformationService} from '@service/locations';
import {ApiFeaturesRequests} from '@api/features-requests/ApiFeaturesRequests';
import {Signal} from "@api/dto/Signal";
import {ReqDeclineFormComponent} from "./req-decline-form/req-decline-form.component";

@Component({
  selector: 'app-oper-profile',
  templateUrl: './oper-profile.component.html',
  styleUrls: ['./oper-profile.component.scss']
})
export class OperProfileComponent implements OnInit {
  archiveRequests: LocationFeatureEditingRequestFull[];

  constructor(
    private readonly matDialog: MatDialog,
    private locationService: LocationsFullInformationService,
    private readonly requestsService: ApiFeaturesRequests,
  ) {
    this.requestsService.requests().subscribe(requests => {
      this.archiveRequests = requests;
    });
  }

  ngOnInit(): void {
  }

  signalsToString(tvOrRadioTypes: Signal[]): string {
    return tvOrRadioTypes.map(tvOrRadioType => tvOrRadioType.name).join(', ');
  }

  acceptReq(request: LocationFeatureEditingRequestFull): void {
    this.requestsService.accept(request.id).subscribe(() => request.status = 'ACCEPTED');
  }

  declineReq(request: LocationFeatureEditingRequestFull): void {
    const matDialogRef = this.matDialog.open(ReqDeclineFormComponent);
    matDialogRef.afterClosed().subscribe(comment => {
      if (comment) {
        this.requestsService.decline(request.id, comment).subscribe();
        request.status = 'DECLINED';
      }
    });
  }
}
