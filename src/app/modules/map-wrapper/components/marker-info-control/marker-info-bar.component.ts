import { ChangeDetectorRef, Component, Input, OnInit, Renderer2 } from '@angular/core';
import { LocationCapabilities } from '@core/models/location-capabilities';
import { LocationCapabilitiesService, OrganizationsService } from '@core/services';
import { ExtendedMap } from '../../../../declarations/leaflet';
import { Organization, Reaccesspoint } from '@core/models/organization';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'marker-info-bar',
  templateUrl: './marker-info-bar.component.html',
  styleUrls: ['./marker-info-bar.component.scss']
})
export class MarkerInfoBarComponent implements OnInit {

  @Input() leafletMap: ExtendedMap;

  currentPointCapabilities: LocationCapabilities;
  organizations: Organization[];

  constructor(private readonly locationCapabilitiesService: LocationCapabilitiesService,
              private readonly organizationsService: OrganizationsService,
              private readonly ref: ChangeDetectorRef,
              private readonly renderer: Renderer2) {
  }

  ngOnInit() {
  }

  openAccordion($event, clazz) {
    if ($event.target.classList.contains('c-accordion-title')) {
      this.toggleClass($event.target.nextElementSibling, clazz);
      this.toggleClass($event.target.lastElementChild, clazz);
    } else {
      this.toggleClass($event.target.parentNode.lastElementChild, clazz);
      this.toggleClass($event.target.parentNode.nextElementSibling, clazz);
    }
  }

  onSelectPoint(point: number) {
    this.leafletMap.spin(true);

    forkJoin<LocationCapabilities, Organization[]>(
      this.locationCapabilitiesService.one(point),
      this.organizationsService.getList(point)
    )
      .subscribe(response => {
        this.currentPointCapabilities = response[0];
        this.organizations = response[1];
        console.log(response[1]);
        this.ref.detectChanges();
        this.leafletMap.spin(false);
      });
  }


  private toggleClass(item: Element, clazz: string) {
    const hasClass = item.classList.contains(clazz);

    if (hasClass) {
      this.renderer.removeClass(item, clazz);
    } else {
      this.renderer.addClass(item, clazz);
    }
  }

  getConnectionType(point: Reaccesspoint) {
    return point.connection_type
      .map(ct => ct.name)
      .join(',');
  }
}
