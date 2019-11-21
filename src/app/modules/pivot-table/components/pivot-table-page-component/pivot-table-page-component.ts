import { Component, OnInit } from '@angular/core';
import { TcPivotsService } from '../../service/tc-pivots.service';
import { LocationCapabilities, TrunkChannelType } from '@shared/models/location-capabilities';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pivot-table-page-component',
  templateUrl: './pivot-table-page-component.html',
  styleUrls: ['./pivot-table-page-component.scss']
})
export class PivotTablePageComponent implements OnInit {

  lcs: LocationCapabilities[];
  TrunkChannelType = TrunkChannelType;

  constructor(private tcPivots: TcPivotsService,
              private spinner: NgxSpinnerService) {
    spinner.show();
    this.tcPivots.list().subscribe(lcs => {
      this.lcs = lcs;
      this.spinner.hide();
    });
  }

  ngOnInit() {
  }

}
