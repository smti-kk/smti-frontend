import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Map, MapOptions } from 'leaflet';
import { LayerControllersFactory } from '@service/leaflet-config/layer-controllers-factory.service';
import { LeafletOptionsConfigurator } from '@service/leaflet-config/LeafletOptionsConfigurator';
import { Observable } from 'rxjs';
import { MapLayers } from '@service/leaflet-config/MapLayers';
import { LocationsService } from '@service/locations/LocationsService';
import { map, tap } from 'rxjs/operators';
import { LoaderService } from '../../loader/LoaderService';
import {
  MunicipalitiesLayer,
  MunicipalitiesLayerGeoJson,
} from '@service/leaflet-config/MunicipalitiesLayer';
import { CellularType } from '@api/dto/CellularType';
import { TrunkChannelsApi } from '@api/trunk-channels/TrunkChannelsApi';
import { TrunkChannel } from '@api/dto/TrunkChannel';
import { TrunkChannelFilters } from '@service/leaflet-config/TrunkChannelsLayer';
import { InternetType } from '@api/dto/InternetType';
import { FormControl } from '@angular/forms';
import { PointLayerController } from '@service/leaflet-config/PointLayerController';
import {PointState} from '@service/points/PointState';

@Component({
  selector: 'best-map',
  templateUrl: './best-map.html',
  styleUrls: ['./best-map.scss'],
})
export class BestMap implements OnInit, OnDestroy {
  @Output() readonly locationClick: EventEmitter<number>;
  @Output() readonly areaClick: EventEmitter<MunicipalitiesLayerGeoJson>;
  @Output() readonly accessPointClick: EventEmitter<{
    type: string;
    id: number;
  }>;
  @Output() readonly baseStationClick: EventEmitter<number>;
  readonly pointsLayers: MapLayers;
  readonly leafletOptions$: Observable<MapOptions>;
  readonly existedTrunkChannelOperators: { [key: string]: boolean } = {};
  readonly existedTrunkChannelType: { [key: string]: boolean } = {};
  map: Map;
  layersChecked = {
    SMO: false,
    ESPD: false,
    ZSPD: false,
    trunkChannelsLayer: false,
    locations: true,
  };
  selectedMobileTypes: { [key: string]: boolean } = {
    '2G': false,
    '3G': false,
    '4G': false,
  };
  hasCellularControl: FormControl;
  hasEspdControl: FormControl;
  hasZspdControl: FormControl;
  currentCellularState: 'state_1' | 'state_2' | 'state_3' | null = null;

  constructor(
    private layersFactory: LayerControllersFactory,
    private leafletOptionsConfigurator: LeafletOptionsConfigurator,
    private locationsService: LocationsService,
    private municipalitiesLayer: MunicipalitiesLayer,
    private readonly loaderService: LoaderService,
    private trunkChannelsApi: TrunkChannelsApi,
  ) {
    this.hasCellularControl = new FormControl();
    this.hasEspdControl = new FormControl();
    this.hasZspdControl = new FormControl();
    this.leafletOptions$ = this.leafletOptionsConfigurator
      .configure()
      .pipe(tap(() => this.loaderService.stopLoader()));
    this.pointsLayers = {
      locations: this.layersFactory.locationLayerController(),
      locationsWithQuality: this.layersFactory.locationsLayerControllerWithQuality(),
      locationsWithCellular:
        this.layersFactory.locationsLayerControllerWithCellular(),
      locationsWithoutCellular:
        this.layersFactory.locationsLayerControllerWithoutCellular(),
      ESPD: this.layersFactory.espdLayerController(),
      SMO: this.layersFactory.smoLayerLayerController(),
      ZSPD: this.layersFactory.zspdLayerLayerController(),
    };
    this.locationClick = new EventEmitter<number>();
    this.pointsLayers.locations.onPointClick().subscribe((id) => {
      this.locationClick.emit(id);
    });
    this.pointsLayers.locationsWithCellular.onPointClick().subscribe((id) => {
      this.locationClick.emit(id);
    });
    this.pointsLayers.locationsWithoutCellular
      .onPointClick()
      .subscribe((id) => {
        this.locationClick.emit(id);
      });
    this.areaClick = this.municipalitiesLayer.onMunicipalityClick;
    this.baseStationClick = new EventEmitter<number>();
    this.accessPointClick = new EventEmitter<{ type: string; id: number }>();
    this.initAccessPointEmitters();
    this.hasCellularControl.valueChanges.subscribe((v) => {
      const pointLayerController = this.currentLocationsLayer();
      pointLayerController.removeFrom(this.map);
      this.currentCellularState = v;
      const pointLayerController1 = this.currentLocationsLayer();
      pointLayerController1.addTo(this.map);
    });
    this.hasEspdControl.valueChanges
      .pipe(map((v) => this.convertBtnStateToPoint(v)))
      .subscribe((v) => {
        this.pointsLayers.ESPD.removeFrom(this.map);
        this.pointsLayers.ESPD = this.layersFactory.espdLayerController(v);
        this.pointsLayers.ESPD.addTo(this.map);
        this.initAccessPointEmitters();

      });
    this.hasZspdControl.valueChanges
      .pipe(map((v) => this.convertBtnStateToPoint(v)))
      .subscribe((v) => {
        this.pointsLayers.ZSPD.removeFrom(this.map);
        this.pointsLayers.ZSPD = this.layersFactory.zspdLayerLayerController(v);
        this.pointsLayers.ZSPD.addTo(this.map);
        this.initAccessPointEmitters();
      });
  }

  ngOnInit(): void {}

  initializeMap(map: Map): void {
    setTimeout(() => {
      this.map = map;
      // this.updateBaseStations();
      this.updateTrunkChannelsLayer();
      this.municipalitiesLayer.addTo(map);
      this.pointsLayers.locations.addTo(map);
    }, 0);
  }

  removeOrAddLayer(id: string, checked: any): void {
    if (id === 'locations') {
      this.hasCellularControl.setValue(null);
    }
    if (id === 'ESPD') {
      this.hasEspdControl.setValue(null)
    }
    if (id === 'ZSPD') {
      this.hasZspdControl.setValue(null)
    }
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
  set centredOnLocation(locationId: { value: number }) {
    if (!locationId || !locationId.value) {
      return;
    }
    if (this.pointsLayers.locations) {
      this.pointsLayers.locations.moveTo(locationId.value);
    }
  }

  ngOnDestroy(): void {
    if (!this.map) {
      return;
    }
    Object.keys(this.pointsLayers).forEach((key) => {
      this.pointsLayers[key].removeFrom(this.map);
    });
  }

  moveToPoint(pointId: number, layerId: string): void {
    this.pointsLayers[layerId].moveTo(pointId);
  }

  updateBaseStations(): void {
    if (this.pointsLayers.baseStations) {
      this.pointsLayers.baseStations.removeFrom(this.map);
    }
    const mobileTypes = Object.keys(this.selectedMobileTypes).filter(
      (mobileType) => this.selectedMobileTypes[mobileType] === true
    ) as CellularType[];
    this.pointsLayers.baseStations =
      this.layersFactory.baseStationsLayerLayerController(mobileTypes);
    this.pointsLayers.baseStations.addTo(this.map);
    this.pointsLayers.baseStations
      .onPointClick()
      .subscribe((id) => this.baseStationClick.emit(id));
  }

  updateTrunkChannelsLayer(): void {
    this.trunkChannelsApi.list().subscribe((trunks) => {
      this.updateExistedChannels(trunks);
      this.updateExistedOperators(trunks);
      const filters: TrunkChannelFilters = {
        channelTypes: Object.keys(this.existedTrunkChannelType).filter(
          (key) => this.existedTrunkChannelType[key]
        ) as InternetType[],
        operatorNames: Object.keys(this.existedTrunkChannelOperators).filter(
          (key) => this.existedTrunkChannelOperators[key]
        ),
      };
      if (this.pointsLayers.trunkChannels) {
        this.pointsLayers.trunkChannels.removeFrom(this.map);
      }
      this.pointsLayers.trunkChannels = this.layersFactory.trunkChannelsLayer(
        trunks,
        filters
      ) as any;
      this.pointsLayers.trunkChannels.addTo(this.map);
    });
  }

  updateExistedOperators(trunkChannels: TrunkChannel[]): void {
    trunkChannels
      .map((t) => t.operator)
      .forEach((operator) => {
        if (!this.existedTrunkChannelOperators[operator.name]) {
          this.existedTrunkChannelOperators[operator.name] = false;
        }
      });
  }

  updateExistedChannels(channels: TrunkChannel[]): void {
    channels
      .map((c) => c.typeTrunkChannel)
      .forEach((channel) => {
        if (!this.existedTrunkChannelType[channel.name]) {
          this.existedTrunkChannelType[channel.name] = false;
        }
      });
  }

  currentLocationsLayer(): PointLayerController {
    if (this.currentCellularState === null) {
      return this.pointsLayers.locations;
    } else if (this.currentCellularState === 'state_1') {
      return this.pointsLayers.locationsWithCellular;
    } else if (this.currentCellularState === 'state_2') {
      return this.pointsLayers.locationsWithQuality;
    } else if (this.currentCellularState === 'state_3') {
      return this.pointsLayers.locationsWithoutCellular;
    }
  }

  convertBtnStateToPoint(state: any): PointState {
    switch (state) {
      case true:
        return 'ACTIVE';
      case false:
        return 'DISABLED';
      case '0':
        return 'NOT_MONITORED';
      case '1':
        return 'PROBLEM';
      default:
        return state;
    }
  }

  initAccessPointEmitters = () => {
    Object.keys(this.pointsLayers)
      .filter(
        (key) =>
          key !== 'trunkChannelsLayer' &&
          key !== 'locations' &&
          key !== 'locationsWithCellular' &&
          key !== 'locationsWithoutCellular' &&
          key !== 'trunkChannels'
      )
      .forEach((key) => {
        this.pointsLayers[key]
          .onPointClick()
          .subscribe((id) => this.accessPointClick.emit({ id, type: key }));
      });
  }
}
