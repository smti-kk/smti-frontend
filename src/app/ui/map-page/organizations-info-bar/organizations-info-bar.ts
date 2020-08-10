import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AORAccessPoint, ApiOrganizationResponse} from '@api/dto/ApiOrganizationResponse';

@Component({
  selector: 'organizations-info-bar',
  templateUrl: './organizations-info-bar.html',
  styleUrls: ['./organizations-info-bar.scss']
})
export class OrganizationsInfoBar implements OnInit {
  @Input() organizations: ApiOrganizationResponse[];
  @Input() organizationsCount: number;
  @Input() openOrganizationBar: {value: boolean} = {value: false};
  @Output() openOrganizationBarChange: EventEmitter<{value: boolean}>;
  @Output() openBar: EventEmitter<void>;
  @Output() openAccessPointBar: EventEmitter<AORAccessPoint>;
  expandedAP: {value: number} = {value: null};

  constructor() {
    this.openBar = new EventEmitter<void>();
    this.openOrganizationBarChange = new EventEmitter<{value: boolean}>();
    this.openAccessPointBar = new EventEmitter<AORAccessPoint>();
  }

  ngOnInit(): void {
  }

  onOpen($event: void): void {
    this.openOrganizationBarChange.emit({value: true});
    this.openBar.emit();
  }

  onClose(): void {
    this.openOrganizationBarChange.emit({value: false});
    setTimeout(() => this.organizations = null, 100);
  }

  onOpenAccesspointBar(accessPoint: AORAccessPoint): void {
    this.openAccessPointBar.emit(accessPoint);
  }

  @Input()
  set openAccessPoint(point: {value: boolean, id: number, type: string}) {
    if (!point) {
      return;
    }
    this.openOrganizationBar = {value: point.value};
    setTimeout(() => {
      this.expandedAP = {value: point.id};
      document.getElementById('access-point-bar-' + point.id).scrollIntoView({block: 'center'});
    }, 5000);
  }
}
