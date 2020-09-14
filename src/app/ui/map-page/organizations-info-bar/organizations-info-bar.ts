import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AORAccessPoint, ApiOrganizationResponse} from '@api/dto/ApiOrganizationResponse';

@Component({
  selector: 'organizations-info-bar',
  templateUrl: './organizations-info-bar.html',
  styleUrls: ['./organizations-info-bar.scss']
})
export class OrganizationsInfoBar implements OnInit, AfterViewChecked {
  iOrganizations: ApiOrganizationResponse[];
  @Input() organizationsCount: number;
  @Input() openOrganizationBar: { value: boolean } = {value: false};
  @Output() openOrganizationBarChange: EventEmitter<{ value: boolean }>;
  @Output() openBar: EventEmitter<void>;
  @Output() openAccessPointBar: EventEmitter<AORAccessPoint>;
  openingAPState = false;
  openingAPStateEmitter: EventEmitter<void> = new EventEmitter<void>();
  private openingAccessPointId: number;

  constructor() {
    this.openBar = new EventEmitter<void>();
    this.openOrganizationBarChange = new EventEmitter<{ value: boolean }>();
    this.openAccessPointBar = new EventEmitter<AORAccessPoint>();
  }

  ngOnInit(): void {
  }

  onOpen($event: void): void {
    this.openOrganizationBarChange.emit({value: true});
    this.openBar.emit();
  }

  onClose(): void {
    // this.openOrganizationBarChange.emit({value: false});
    // setTimeout(() => this.organizations = null, 100);
  }

  onOpenAccesspointBar(accessPoint: AORAccessPoint): void {
    this.openAccessPointBar.emit(accessPoint);
  }

  get organizations(): ApiOrganizationResponse[] {
    return this.iOrganizations;
  }

  @Input()
  set organizations(value: ApiOrganizationResponse[]) {
    this.iOrganizations = value;
    if (this.openingAPState) {
      setTimeout(() => {
        this.openingAPStateEmitter.emit();
        this.openingAPState = false;
      }, 100);
    }
  }

  @Input()
  set openAccessPoint(point: { value: boolean, id: number, type: string }) {
    if (!point) {
      return;
    }
    this.openOrganizationBar = {value: true};
    if (!this.organizations) {
      setTimeout(() => this.openAccessPoint = point, 10);
      return;
    }
    this.organizations.forEach(organization => {
      const accessPoint = organization.accesspoints.find(ap => {
        if (ap.id === point.id) {
          ap.opened = true;
          return true;
        } else {
          ap.opened = false;
          return false;
        }
      });
      organization.opened = !!accessPoint;
    });
    this.openingAccessPointId = point.id;
  }

  ngAfterViewChecked(): void {
    if (this.openingAccessPointId) {
      const elementById = document.getElementById('access-point-bar-' + this.openingAccessPointId);
      if (elementById) {
        elementById.scrollIntoView({block: 'center', behavior: 'smooth'});
      }
      this.openingAccessPointId = null;
    }
  }
}
