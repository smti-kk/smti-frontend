import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AORAccessPoint, ApiOrganizationResponse} from '@api/dto/ApiOrganizationResponse';
import {Pageable} from '@api/dto/Pageable';
import {ApiOrganization} from '@api/organizations/ApiOrganization';

@Component({
  selector: 'organizations-info-bar',
  templateUrl: './organizations-info-bar.html',
  styleUrls: ['./organizations-info-bar.scss']
})
export class OrganizationsInfoBar implements OnInit, AfterViewChecked {
  iOrganizations: Pageable<ApiOrganizationResponse[]>;
  @Input() organizationsCount: number;
  @Input() openOrganizationBar: { value: boolean } = {value: false};
  @Output() openOrganizationBarChange: EventEmitter<{ value: boolean }>;
  @Output() openBar: EventEmitter<void>;
  @Output() openAccessPointBar: EventEmitter<AORAccessPoint>;
  openingAccessPointId: number;
  page = 0;
  locationId: number;
  currentAp: number;

  constructor(private organizationsApi: ApiOrganization) {
    this.openBar = new EventEmitter<void>();
    this.openOrganizationBarChange = new EventEmitter<{ value: boolean }>();
    this.openAccessPointBar = new EventEmitter<AORAccessPoint>();
  }

  ngOnInit(): void {
  }

  onOpen($event: void): void {
    this.openOrganizationBarChange.emit({value: true});
    this.openOrganizationBar = {value: true};
    this.openBar.emit();
  }

  onClose(): void {
    this.openOrganizationBar = {value: false};
    // this.openOrganizationBarChange.emit({value: false});
    // setTimeout(() => this.organizations = null, 100);
  }

  onOpenAccesspointBar(accessPoint: AORAccessPoint): void {
    this.openAccessPointBar.emit(accessPoint);
  }

  get organizations(): Pageable<ApiOrganizationResponse[]> {
    return this.iOrganizations;
  }

  @Input()
  set organizations(value: Pageable<ApiOrganizationResponse[]>) {
    this.page = 0;
    this.iOrganizations = value;
    this.currentAp = null;
    if (!value) {
      return;
    }
    if (value.content[0]) {
      this.locationId = value.content[0].location.id;
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
    this.currentAp = point.id;
    this.organizations.content.forEach(organization => {
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
      setTimeout(() => {
        const elementById = document.getElementById('access-point-bar-' + this.openingAccessPointId);
        if (elementById) {
          elementById.scrollIntoView({block: 'center', behavior: 'smooth'});
        }
        this.openingAccessPointId = null;
      }, 150);
    }
  }

  onScroll(): void {
    this.page++;
    let observer;
    if (this.currentAp) {
      observer = this.organizationsApi.organizationsByLocationWithoutAp(this.locationId, this.page, 8, this.currentAp);
    } else {
      observer = this.organizationsApi.organizationsByLocation(this.locationId, this.page);
    }
    observer.subscribe((response => {
      response.content = [...this.organizations.content, ...response.content];
      this.organizations = response;
    }));
  }

  hasNextItems(): boolean {
    if (!this.organizations) {
      return false;
    }
    return this.organizations.content.length !== this.organizations.totalElements;
  }
}
