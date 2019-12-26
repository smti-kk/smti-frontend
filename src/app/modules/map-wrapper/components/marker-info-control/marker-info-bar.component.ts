import {ChangeDetectorRef, Component, Input, OnInit, Renderer2} from '@angular/core';
import {EnumService, OrganizationsService} from '@core/services';
import {ExistingOperators, LocationFeatures, Organization} from '@core/models';
import {forkJoin} from 'rxjs';
import {Map} from 'leaflet';
import {LocationFeaturesService} from '@core/services/location-features.service';
import {Reaccesspoint} from '@core/models/reaccesspoint';
import {AccessPointSmoLayer} from '@map-wrapper/layers/access-point-smo-layer';
import {AccessPointEspdLayer} from '@map-wrapper/layers/access-point-espd-layer';
import {MonitoringMarker} from '@map-wrapper/components/monitoring-marker';
import {tap} from 'rxjs/operators';
import {AdministrativeCentersLayer} from '@map-wrapper/layers/administrative-centers-layer';

@Component({
  selector: 'marker-info-bar',
  templateUrl: './marker-info-bar.component.html',
  styleUrls: ['./marker-info-bar.component.scss'],
})
export class MarkerInfoBarComponent implements OnInit {
  @Input() leafletMap: Map;

  locationFeatures: LocationFeatures;
  organizations: Organization[];
  existingOperators: ExistingOperators;
  private currentLocationId: number;

  constructor(
    private readonly locationFeaturesService: LocationFeaturesService,
    private readonly enumService: EnumService,
    private readonly organizationsService: OrganizationsService,
    private readonly ref: ChangeDetectorRef,
    private readonly renderer: Renderer2,
    private accessPointEspdLayer: AccessPointEspdLayer,
    private accessPointSmoLayer: AccessPointSmoLayer,
    private administrativeCentersLayer: AdministrativeCentersLayer,
    private cdr: ChangeDetectorRef
  ) {
    enumService.getExistingOperators().subscribe(value => {
      this.existingOperators = value;
    });

    accessPointEspdLayer.onMarkerClick.subscribe(marker => {
      this.openOrganizationPoint(marker);
    });

    accessPointSmoLayer.onMarkerClick.subscribe(marker => {
      this.openOrganizationPoint(marker);
    });

    administrativeCentersLayer.onMarkerClick.subscribe(marker => {
      this.currentLocationId = marker.feature.properties.id;
    });
  }

  ngOnInit() {}

  openAccordion(target, clazz) {
    if (target.classList.contains('c-accordion-title')) {
      this.toggleClass(target.nextElementSibling, clazz);
      this.toggleClass(target.lastElementChild, clazz);
    } else {
      this.toggleClass(target.parentNode.lastElementChild, clazz);
      this.toggleClass(target.parentNode.nextElementSibling, clazz);
    }
  }

  onSelectPoint(point: number) {
    this.leafletMap.spin(true);

    return forkJoin(
      this.locationFeaturesService.oneLocationFeature(point),
      this.organizationsService.getList(point)
    ).pipe(
      tap(response => {
        this.locationFeatures = response[0];
        this.organizations = response[1];
        this.ref.detectChanges();
        this.leafletMap.spin(false);
      })
    );
  }

  moveToPoint(point: Reaccesspoint) {
    this.leafletMap.flyTo({lat: point.point.lat, lng: point.point.lng}, 18);
  }

  private toggleClass(item: Element, clazz: string) {
    const hasClass = item.classList.contains(clazz);

    if (hasClass) {
      this.renderer.removeClass(item, clazz);
    } else {
      this.renderer.addClass(item, clazz);
    }
  }

  openAccordionForce(target, clazz) {
    if (target.classList.contains('c-accordion-title')) {
      this.addClass(target.nextElementSibling, clazz);
      this.addClass(target.lastElementChild, clazz);
    } else {
      this.addClass(target.parentNode.lastElementChild, clazz);
      this.addClass(target.parentNode.nextElementSibling, clazz);
    }
  }

  private addClass(item: Element, clazz: string) {
    const hasClass = item.classList.contains(clazz);

    if (!hasClass) {
      this.renderer.addClass(item, clazz);
    }
  }

  private openOrganizationPoint(marker: MonitoringMarker<Reaccesspoint>) {
    if (this.currentLocationId !== marker.feature.properties.locationId) {
      this.onSelectPoint(marker.feature.properties.locationId).subscribe(() => {
        this.openOrganizationAccessPoint(marker.feature.properties);
        this.currentLocationId = marker.feature.properties.locationId;
      });
    } else {
      this.openOrganizationAccessPoint(marker.feature.properties);
    }
  }

  private openOrganizationAccessPoint(accessPoint: Reaccesspoint) {
    const organizationId = accessPoint.organizationId;

    const organizationsAccordion = document.getElementById('organizationsAccordion');
    const organization = document.getElementById(organizationId.toString());
    const point = document.getElementById(accessPoint.id.toString());

    this.openAccordionForce(organizationsAccordion, 'is-open');
    this.openAccordionForce(organization, 'is-open');
    this.openAccordionForce(point, 'is-open');

    point.scrollIntoView({block: 'center'});
  }
}
