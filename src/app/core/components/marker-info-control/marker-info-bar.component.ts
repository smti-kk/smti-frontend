import { ChangeDetectorRef, Component, Input, OnInit, Renderer2 } from '@angular/core';
import { LocationCapabilities } from '../../../shared/model/LocationCapabilities';
import { FormBuilder } from '@angular/forms';
import { Map, Marker } from 'leaflet';
import { AdministrativeCentersLayer } from '@map-wrapper/administrative-centers-layer';
import { LocationCapabilitiesService } from '../../../shared/services/location-capabilities.service';
import { HIGHLIGHT_FEATURE, MAP_TERRITORIES_STYLE } from '@map-wrapper/constants/inline.style';

@Component({
  selector: 'marker-info-bar',
  templateUrl: './marker-info-bar.component.html',
  styleUrls: ['./marker-info-bar.component.scss']
})
export class MarkerInfoBarComponent implements OnInit {

  @Input() leafletMap: Map;
  @Input() locations: any[];
  @Input() administrativeLayer: AdministrativeCentersLayer;

  location: LocationCapabilities;
  lastActiveLocation;
  searchForm = this.fb.group({
    area: []
  });

  constructor(private fb: FormBuilder,
              private locationCapabilitiesService: LocationCapabilitiesService,
              private ref: ChangeDetectorRef,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.administrativeLayer.onMarkerClick.subscribe((marker: Marker) => {
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
}
