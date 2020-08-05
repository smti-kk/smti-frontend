import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'organizations-info-bar',
  templateUrl: './organizations-info-bar.html',
  styleUrls: ['./organizations-info-bar.scss']
})
export class OrganizationsInfoBar implements OnInit {
  @Input() organizations: {}[];

  constructor() { }

  ngOnInit(): void {
  }

}
