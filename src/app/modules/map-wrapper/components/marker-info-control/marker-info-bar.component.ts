import { ChangeDetectorRef, Component, Input, OnInit, Renderer2 } from '@angular/core';
import { EnumService, OrganizationsService } from '@core/services';
import { ExistingOperators, LocationFeatures, Organization } from '@core/models';
import { forkJoin } from 'rxjs';
import { Map } from 'leaflet';
import { LocationFeaturesService } from '@core/services/location-features.service';

@Component({
  selector: 'marker-info-bar',
  templateUrl: './marker-info-bar.component.html',
  styleUrls: ['./marker-info-bar.component.scss']
})
export class MarkerInfoBarComponent implements OnInit {

  @Input() leafletMap: Map;

  locationFeatures: LocationFeatures;
  organizations: Organization[];
  private existingOperators: ExistingOperators;

  constructor(private readonly locationFeaturesService: LocationFeaturesService,
              private readonly enumService: EnumService,
              private readonly organizationsService: OrganizationsService,
              private readonly ref: ChangeDetectorRef,
              private readonly renderer: Renderer2) {
    enumService.getExistingOperators().subscribe(value => {
      this.existingOperators = value;
    });
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

    forkJoin(
      this.locationFeaturesService.oneLocationFeature(point),
      this.organizationsService.getList(point)
    )
      .subscribe(response => {
        this.locationFeatures = response[0];
        this.organizations = response[1];
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
}
