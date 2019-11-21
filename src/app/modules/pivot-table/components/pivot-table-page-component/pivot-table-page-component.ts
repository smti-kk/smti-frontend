import { Component, OnInit } from '@angular/core';
import { FilterTcPivotsService, FilterType } from '../../service/tc-pivots.service';
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

  constructor(private tcPivots: FilterTcPivotsService,
              private spinner: NgxSpinnerService) {
    this.loadPivots();
  }

  ngOnInit() {
  }

  orderingByLocation() {
    this.tcPivots.addFilterOrdering('name', FilterType.ASC);
    this.loadPivots();
  }

  orderingByArea() {
    this.tcPivots.addFilterOrdering('parent', FilterType.ASC);
    this.loadPivots();
  }

  orderingByPopulation() {
    this.tcPivots.addFilterOrdering('people_count', FilterType.ASC);
    this.loadPivots();
  }

  private loadPivots() {
    this.spinner.show();
    this.tcPivots.list().subscribe(lcs => {
      console.log(lcs);
      this.lcs = lcs;
      this.spinner.hide();
    });
  }
}
