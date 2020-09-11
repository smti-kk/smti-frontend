import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {LocationInfoBarValue} from '@service/dto/LocationInfoBarValue';

@Component({
  selector: 'location-info-bar',
  templateUrl: './location-info-bar.html',
  styleUrls: ['./location-info-bar.scss'],
})
export class LocationInfoBar implements OnInit {
  @Input()
  public location: LocationInfoBarValue;

  constructor() { }

  ngOnInit(): void {
  }
}
