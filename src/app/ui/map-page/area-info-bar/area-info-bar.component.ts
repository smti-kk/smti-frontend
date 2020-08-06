import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'area-info-bar',
  templateUrl: './area-info-bar.component.html',
  styleUrls: ['./area-info-bar.component.scss']
})
export class AreaInfoBarComponent implements OnInit {

  @Input() areas: {}[];

  panelOpenState = true;

  constructor() { }

  ngOnInit(): void {
  }

}
