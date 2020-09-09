import {Component, Input, OnInit} from '@angular/core';
import {BaseStation} from '@api/dto/BaseStation';

@Component({
  selector: 'app-base-station-info-bar',
  templateUrl: './base-station-info-bar.component.html',
  styleUrls: ['./base-station-info-bar.component.scss']
})
export class BaseStationInfoBarComponent implements OnInit {

  @Input()
  public station: BaseStation;

  constructor() {
  }

  ngOnInit(): void {
  }

}
