import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import AccessPointLayer from './components/access-point-layer';
import { Subject } from 'rxjs';
import { LatLngBounds, Layer, Map } from 'leaflet';
import { LeafletControlLayersConfig, LeafletDirective } from '@asymmetrik/ngx-leaflet';
import AccessPointsService from './service/access-points.service';
import AdministrativeCenterPoint from './model/administrative-center-point';

const MARKER_ICON_DEFAULT = '../../../../assets/marker-icon-default.png';
const MAX_ZOOM = 12;

@Directive({
  selector: '[administrativeCenters]'
})
export class AdministrativeCentersLayerDirective<T> extends AccessPointLayer<AdministrativeCenterPoint> implements OnInit {
  @Input() leafletLayersControl: LeafletControlLayersConfig;
  @Output() administrativeCentersLayerReady: EventEmitter<Layer>;

  constructor(private leafletDirective: LeafletDirective,
              private accessPointsService: AccessPointsService) {
    super();
    this.administrativeCentersLayerReady = new EventEmitter<Layer>();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getMap().on('zoomend', () => {
      if (this.getMap().getZoom() < MAX_ZOOM) {
        this.getMap().removeLayer(this.layer);
      } else {
        this.getMap().addLayer(this.layer);
      }
    });
  }

  getIconUrl(): string {
    return MARKER_ICON_DEFAULT;
  }

  getUpdatedPoints(interval: number, startStopUpdate?: EventEmitter<any>,
                   bounds?: () => LatLngBounds): Subject<AdministrativeCenterPoint[]> {
    const locationCapabilities = new Subject<AdministrativeCenterPoint[]>();

    this.accessPointsService.getAdministrativePoints().then(pointsObserver => {
      pointsObserver.subscribe(ap => {
        locationCapabilities.next(ap);
      });
    });

    return locationCapabilities;
  }

  renderPopup(point: AdministrativeCenterPoint) {
    const str: string[] = [];

    str.push('<h4 style="text-align: center; margin-bottom: 5px;">' + point.center + '</h4>');
    str.push('<h4 style="margin-bottom: 5px;">Район: ' + point.area + '</h4>');
    str.push('<h4 style="margin-bottom: 5px;">Население: ' + point.population + '</h4>');
    str.push('<h4 style="margin-bottom: 5px;">Мобильная связь: </h4>');
    point.mobileConnection.forEach(mc => {
      str.push('<img src="' + mc.icon + '" alt="' + mc.name + '" width="16px" height="16px" />');
      str.push('<b class="mobile-type">' + mc.type + '</b>');
    });

    str.push('<h4 style="margin-top: 5px;">Уровень мобильной связи: ' + point.mobileLevel + '</h4>');

    str.push('<h4 style="margin-top: 5px; margin-bottom: 5px;">Интернет: </h4>');
    point.internet.forEach(internet => {
      str.push('<img src="' + internet.icon + '" alt="' + internet.name + '" width="16px" height="16px"/>');
    });

    str.push('<h4 style="margin-top: 5px;">ТВ: </h4>');
    point.tv.forEach(tv => {
      str.push('<img src="' + tv.icon + '" alt="' + tv.title + '" width="16px" height="16px"/>');
      str.push('<span style="font-size: 10px;">' + tv.type + '</span>');
    });

    str.push('<h4 style="margin-top: 5px;">Радио: </h4>');
    point.radio.forEach(radio => {
      str.push('<img src="' + radio.icon + '" alt="' + radio.name + '" width="16px" height="16px"/>');
      str.push('<span>' + radio.type + '</span>');
    });

    return str.join(' ');
  }

  addToLayersControl(layersControl: LeafletControlLayersConfig, layer: Layer) {
    this.layer.addTo(this.leafletDirective.map);
    this.administrativeCentersLayerReady.emit(layer);
  }

  getLayersControl(): LeafletControlLayersConfig {
    return this.leafletLayersControl;
  }

  getMap(): Map {
    return this.leafletDirective.map;
  }
}
