import { Component, OnInit } from '@angular/core';
import { TcPivotsService } from '../../service/tc-pivots.service';
import { LocationCapabilities, TrunkChannelType } from '@shared/models/location-capabilities';

@Component({
  selector: 'app-pivot-table-page-component',
  templateUrl: './pivot-table-page-component.html',
  styleUrls: ['./pivot-table-page-component.scss']
})
export class PivotTablePageComponent implements OnInit {

  lcs: LocationCapabilities[];
  TrunkChannelType = TrunkChannelType;

  constructor(private tcPivots: TcPivotsService) {
    this.tcPivots.list().subscribe(lcs => {
      console.log(lcs);
      this.lcs = lcs;
    });
  }

  ngOnInit() {
  }

}
