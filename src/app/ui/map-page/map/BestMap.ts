import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Map, MapOptions} from 'leaflet';
import {LayerControllersFactory} from '@service/leaflet-config/layer-controllers-factory.service';
import {LeafletOptionsConfigurator} from '@service/leaflet-config/LeafletOptionsConfigurator';
import {Observable} from 'rxjs';
import {MapLayers} from '@service/leaflet-config/MapLayers';
import {LocationsService} from '@service/locations/LocationsService';
import {tap} from 'rxjs/operators';
import {LoaderService} from '../../loader/LoaderService';
import {MunicipalitiesLayer, MunicipalitiesLayerGeoJson} from '@service/leaflet-config/MunicipalitiesLayer';

@Component({
  selector: 'best-map',
  templateUrl: './best-map.html',
  styleUrls: ['./best-map.scss'],
})
export class BestMap implements OnInit, OnDestroy {
  @Output() readonly locationClick: EventEmitter<number>;
  @Output() readonly areaClick: EventEmitter<MunicipalitiesLayerGeoJson>;
  @Output() readonly accessPointClick: EventEmitter<{ type: string, id: number }>;
  readonly pointsLayers: MapLayers;
  readonly leafletOptions$: Observable<MapOptions>;
  map: Map;
  layersChecked = {
    SMO: false,
    ESPD: false,
    trunkChannelsLayer: false,
    locations: true
  };

  constructor(private layersFactory: LayerControllersFactory,
              private locationsService: LocationsService,
              private leafletOptionsConfigurator: LeafletOptionsConfigurator,
              private municipalitiesLayer: MunicipalitiesLayer,
              private readonly loaderService: LoaderService) {
    this.leafletOptions$ = this.leafletOptionsConfigurator.configure().pipe(
      tap(() => this.loaderService.stopLoader())
    );
    this.pointsLayers = {
      locations: this.layersFactory.locationLayerController(),
      ESPD: this.layersFactory.espdLayerController(),
      SMO: this.layersFactory.smoLayerLayerController(),
      trunkChannelsLayer: layersFactory.trunkChannelsLayer() as any
    };
    this.locationClick = this.pointsLayers.locations.onPointClick();
    this.areaClick = this.municipalitiesLayer.onMunicipalityClick;
    this.accessPointClick = new EventEmitter<{ type: string, id: number }>();
    Object.keys(this.pointsLayers)
      .filter((key) => key !== 'trunkChannelsLayer')
      .forEach((key) => {
        this.pointsLayers[key]
          .onPointClick()
          .subscribe((id) => this.accessPointClick.emit({id, type: key}));
      });
  }

  ngOnInit(): void {
    this.pointsLayers.baseStations = this.layersFactory.baseStationsLayerLayerController();
  }

  initializeMap(map: Map): void {
    setTimeout(() => this.map = map, 0);
    this.municipalitiesLayer.addTo(map);
    this.pointsLayers.locations.addTo(map);
  }

  removeOrAddLayer(id: string, checked: any): void {
    if (!checked.target.checked) {
      this.removeLayer(id);
    } else {
      this.addLayer(id);
    }
  }

  addLayer(id: string): void {
    this.layersChecked[id] = true;
    this.pointsLayers[id].addTo(this.map);
  }

  removeLayer(id: string): void {
    this.layersChecked[id] = false;
    this.pointsLayers[id].removeFrom(this.map);
  }

  @Input()
  set centredOnLocation(locationId: number) {
    if (!locationId) {
      return;
    }
    if (this.pointsLayers.locations) {
      this.pointsLayers.locations.moveTo(locationId);
    }
  }

  ngOnDestroy(): void {
    if (!this.map) {
      return;
    }
    Object.keys(this.pointsLayers).forEach(key => {
      this.pointsLayers[key].removeFrom(this.map);
    });
  }

  moveToPoint(pointId: number, layerId: string): void {
    this.pointsLayers[layerId].moveTo(pointId);
  }
}
