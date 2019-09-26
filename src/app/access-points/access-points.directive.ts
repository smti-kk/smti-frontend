import { Directive, EventEmitter, Input, OnInit } from '@angular/core';
import { LeafletControlLayersConfig, LeafletDirective } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import { Icon, LayerGroup, Map, Marker, marker } from 'leaflet';
import AccessPointsService from './service/access-points.service';
import AccessPoint from './model/access-point';
import AccessPointEspd from './model/access-point-espd';
import AccessPointSmo from './model/access-point-smo';

const TIMER_INTERVAL = 10 * 60 * 1000;
const RED_MARKER_PATH = '../../../../assets/map_marker-red1.png';
const BLUE_MARKER_PATH = '../../../../assets/map-marker-2.png';

@Directive({
  selector: '[accessPoints]'
})
export class AccessPointsDirective implements OnInit {

  espdPointsStartSwitch: EventEmitter<any> = new EventEmitter<any>();
  smoPointsStartSwitch: EventEmitter<any> = new EventEmitter<any>();

  private readonly smoPoints: L.MarkerClusterGroup;
  private readonly espdPoints: L.MarkerClusterGroup;

  @Input() leafletLayersControl: LeafletControlLayersConfig;
  map: Map;

  constructor(private accessPointsService: AccessPointsService,
              private leafletDirective: LeafletDirective) {
    if (!leafletDirective) {
      throw new Error('Required leaflet directive from @asymmetrik/ngx-leaflet');
    }
    this.smoPoints = L.markerClusterGroup({});
    this.espdPoints = L.markerClusterGroup({});
  }

  ngOnInit(): void {
    this.map = this.leafletDirective.map;
    this.leafletDirective.onMapMoveEnd.subscribe(() => this.onMapMoveEnd());
    this.init();
  }

  init(): void {
    if (!this.leafletLayersControl) {
      throw new Error('Required leafletLayersControl attribute');
    }

    this.leafletLayersControl.overlays['СЗО Точки'] = this.smoPoints;
    this.leafletLayersControl.overlays['ЕСПД Точки'] = this.espdPoints;

    this.accessPointsService.getUpdatedSmoPoints(TIMER_INTERVAL, this.smoPointsStartSwitch, this.map.getBounds.bind(this.map))
      .subscribe(points => {
        this.updateMarkers(this.smoPoints, points, this.getDivSMO, RED_MARKER_PATH);
      });

    this.accessPointsService.getUpdatedEspdPoints(TIMER_INTERVAL, this.espdPointsStartSwitch, this.map.getBounds.bind(this.map))
      .subscribe(points => {
        this.updateMarkers(this.espdPoints, points, this.getDivESPD, BLUE_MARKER_PATH);
      });

    this.smoPoints.on('add', () => {
      this.smoPointsStartSwitch.emit();
    });

    this.smoPoints.on('remove', () => {
      this.smoPointsStartSwitch.emit();
    });

    this.espdPoints.on('add', () => {
      this.espdPointsStartSwitch.emit();
    });

    this.espdPoints.on('remove', () => {
      this.espdPointsStartSwitch.emit();
    });
  }

  private onMapMoveEnd() {
    if (this.map.hasLayer(this.espdPoints)) {
      this.espdPointsStartSwitch.emit();
      this.espdPointsStartSwitch.emit();
    }

    if (this.map.hasLayer(this.smoPoints)) {
      this.smoPointsStartSwitch.emit();
      this.smoPointsStartSwitch.emit();
    }
  }

  private updateMarkers(pointMarkersLayer: LayerGroup, points: AccessPoint[], popupCreator: (point) => string, iconUrl: string) {
    pointMarkersLayer.getLayers()
      .filter((pointMarker: any) => !points.find(point => point.pk === pointMarker.id))
      .forEach(pointMarker => pointMarkersLayer.removeLayer(pointMarker));

    points.forEach(point => {
      const pointMarkers: any[] = pointMarkersLayer.getLayers();

      const markerOnLayer: Marker = pointMarkers.find(pointMarker => pointMarker.id === point.pk);

      if (markerOnLayer) {
        if (markerOnLayer.getLatLng().lat !== point.point.lat &&
          markerOnLayer.getLatLng().lng !== point.point.lng) {
          markerOnLayer.setLatLng({lat: point.point.lat, lng: point.point.lng});
        }
        markerOnLayer.bindPopup(popupCreator(point));
      } else {
        const icon = new Icon({
          iconUrl,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          shadowAnchor: [4, 62],
          popupAnchor: [-1, -25]
        });

        const pointMarker: any = marker([point.point.lat, point.point.lng], {icon})
          .bindPopup(popupCreator(point));
        pointMarker.id = point.pk;
        pointMarkersLayer.addLayer(pointMarker);
      }
    });
  }

  getDivESPD(pointESPD: AccessPointEspd) {
    return '<strong>Наименование организации: </strong>' + (pointESPD.orgName ? pointESPD.orgName : '?')
      + '<br />' + '<strong>Адрес точки подключения: </strong>' + (pointESPD.actualAddress ? pointESPD.actualAddress : '?')
      + '<br />' + '<strong>Заказчик: </strong>' + (pointESPD.customer ? pointESPD.customer : '?')
      + '<br />' + '<strong>Подрядчик: </strong>' + (pointESPD.contractor ? pointESPD.contractor : '?')
      + '<br />' + '<strong>Технология подключения: </strong>' + (pointESPD.mediumType ? pointESPD.mediumType : '?')
      + '<br />' + '<strong>Точка подключения: </strong>' + (pointESPD.connection ? pointESPD.connection : '?')
      + '<br />' + '<strong>Скорость по тарифу: </strong>' + (pointESPD.definedSpeed ? pointESPD.definedSpeed : '?');
  }

  getDivSMO(pointSMO: AccessPointSmo): string {
    return '<strong>Наименование организации: </strong>' + (pointSMO.orgName ? pointSMO.orgName : '?')
      + '<br />' + '<strong>Адрес точки подключения: </strong>' + (pointSMO.actualAddress ? pointSMO.actualAddress : '?')
      + '<br />' + '<strong>Поставщик интернета: </strong>' + (pointSMO.networkProvider ? pointSMO.networkProvider : '?')
      + '<br />' + '<strong>Технология подключения: </strong>' + (pointSMO.mediumType ? pointSMO.mediumType : '?')
      + '<br />' + '<strong>Скорость по тарифу: </strong>' + (pointSMO.definedSpeed ? pointSMO.definedSpeed : '?')
      + '<br />' + '<strong>Вид СЗО: </strong>' + (pointSMO.cmoType ? pointSMO.cmoType : '?')
      + '<br />' + '<strong>Тип учреждения: </strong>' + (pointSMO.institutionType ? pointSMO.institutionType : '?')
      + '<br />' + '<strong>Примечание: </strong>' + (pointSMO.description ? pointSMO.description : '---');
  }

}
