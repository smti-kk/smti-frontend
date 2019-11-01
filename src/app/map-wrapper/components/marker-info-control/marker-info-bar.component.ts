import { ChangeDetectorRef, Component, Input, OnInit, Renderer2 } from '@angular/core';
import { LocationCapabilities, Telephone } from '../../../shared/models/location-capabilities';
import { LocationCapabilitiesService } from '../../../shared/services/location-capabilities.service';
import { ExtendedMap } from '../../../declarations/leaflet';

@Component({
  selector: 'marker-info-bar',
  templateUrl: './marker-info-bar.component.html',
  styleUrls: ['./marker-info-bar.component.scss']
})
export class MarkerInfoBarComponent implements OnInit {

  @Input() leafletMap: ExtendedMap;

  currentPointCapabilities: LocationCapabilities;

  constructor(private readonly locationCapabilitiesService: LocationCapabilitiesService,
              private readonly ref: ChangeDetectorRef,
              private readonly renderer: Renderer2) {
  }

  ngOnInit() {
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

  hasProvider(telephone: Telephone[]) {
    return telephone.find(t => t.provider.isActive === true);
  }


  onSelectPoint(point: LocationCapabilities) {
    this.currentPointCapabilities = point;
    this.ref.detectChanges();
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
