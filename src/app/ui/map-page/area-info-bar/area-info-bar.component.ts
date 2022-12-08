import {Component, Input, OnInit} from '@angular/core';
import {LocationProvidingInfo} from '@api/dto/LocationProvidingInfo';

@Component({
  selector: 'area-info-bar',
  templateUrl: './area-info-bar.component.html',
  styleUrls: ['./area-info-bar.component.scss']
})
export class AreaInfoBarComponent implements OnInit {

  @Input() area: LocationProvidingInfo;

  @Input() expanded: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
