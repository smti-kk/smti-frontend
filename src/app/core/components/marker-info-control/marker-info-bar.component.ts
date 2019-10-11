import { ChangeDetectorRef, Component, Input, OnInit, Renderer2 } from '@angular/core';
import { LocationCapabilities } from '../../../shared/model/LocationCapabilities';
import { FormBuilder } from '@angular/forms';
import { Map, Marker } from 'leaflet';
import { LocationCapabilitiesService } from '../../../shared/services/location-capabilities.service';
import { HIGHLIGHT_FEATURE, MAP_TERRITORIES_STYLE } from '@map-wrapper/constants/inline.style';
import { LayersService } from '@map-wrapper/service/layers.service';
import AdministrativeCenterPoint from '@map-wrapper/model/administrative-center-point';

@Component({
  selector: 'marker-info-bar',
  templateUrl: './marker-info-bar.component.html',
  styleUrls: ['./marker-info-bar.component.scss']
})
export class MarkerInfoBarComponent implements OnInit {

  @Input() leafletMap: Map;
  locations: any[];
  location: LocationCapabilities;
  lastActiveLocation;

  searchForm = this.fb.group({
    area: []
  });
  administrativePoints: AdministrativeCenterPoint[];
  searchAdministrativePoints: AdministrativeCenterPoint[] = [];

  constructor(private fb: FormBuilder,
              private locationCapabilitiesService: LocationCapabilitiesService,
              private layersService: LayersService,
              private ref: ChangeDetectorRef,
              private renderer: Renderer2) {
    layersService.getMunicipalities().subscribe(m => this.locations = m.getLayers());
  }

  ngOnInit() {
    this.layersService.getAdministrativeCenters().onMarkerClick.subscribe((marker: Marker) => {
      this.locationCapabilitiesService.getById(marker.feature.properties.id).subscribe(location => {
        this.location = location;
        this.ref.detectChanges();
      });
    });
  }

  onSelectLocation() {
    if (this.lastActiveLocation) {
      this.lastActiveLocation.setStyle(MAP_TERRITORIES_STYLE);
    }
    this.leafletMap.fitBounds(this.searchForm.value.area.getBounds());
    this.searchForm.value.area.setStyle(HIGHLIGHT_FEATURE);
    this.searchForm.value.area.bringToFront();

    this.lastActiveLocation = this.searchForm.value.area;

    this.searchAdministrativePoints = [];
    this.administrativePoints = this.layersService.getAdministrativePointsByArea(this.searchForm.value.area);
  }

  openAccordion($event, clazz) {
    if ($event.target.classList.contains('accordion-title')) {
      this.toggleClass($event.target.nextElementSibling, clazz);
      this.toggleClass($event.target.lastElementChild, clazz);
    } else {
      this.toggleClass($event.target.parentNode.lastElementChild, clazz);
      this.toggleClass($event.target.parentNode.nextElementSibling, clazz);
    }
  }

  private toggleClass(item: Element, clazz: any) {
    const hasClass = item.classList.contains(clazz);

    if (hasClass) {
      this.renderer.removeClass(item, clazz);
    } else {
      this.renderer.addClass(item, clazz);
    }
  }

  setSelectedPoint(point: AdministrativeCenterPoint, locationSearch: HTMLInputElement) {
    const marker = this.layersService.getAdministrativeMarker(point);
    this.leafletMap.flyTo(marker.getLatLng(), 18);
    marker.openPopup();
    locationSearch.value = point.name;

    this.locationCapabilitiesService.getById(point.pk).subscribe(location => {
      this.location = location;
      this.ref.detectChanges();
    });
  }

  onSearch($event) {
    this.searchAdministrativePoints = this.administrativePoints.filter(ap => ap.name.includes($event.target.value));
  }
}
