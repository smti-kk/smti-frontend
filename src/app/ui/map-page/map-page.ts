import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationInfoBarValue} from '@service/dto/LocationInfoBarValue';
import {Observable} from 'rxjs';
import {LocationsService} from '@service/locations/LocationsService';
import {BestMap} from './map/BestMap';
import {LocationDetailApi} from '@api/locations/LocationDetailApi';
import {LocationProvidingInfo} from '@api/dto/LocationProvidingInfo';
import {ApiOrganization} from '@api/organizations/ApiOrganization';
import {AORAccessPoint, ApiOrganizationResponse} from '@api/dto/ApiOrganizationResponse';
import {AccessPointsApi} from '@api/access-points/AccessPointsApi';
import {MunicipalitiesLayer} from '@service/leaflet-config/MunicipalitiesLayer';
import {BaseStationsApi} from '@api/base-stations/BaseStationsApi';
import {BaseStation} from '@api/dto/BaseStation';
import {tap} from 'rxjs/operators';
import {Pageable} from '@api/dto/Pageable';

@Component({
  selector: 'map-page',
  templateUrl: './map-page.html',
  styleUrls: ['./map-page.scss'],
})
export class MapPage implements OnInit {
  location: LocationInfoBarValue;
  isLoading: boolean;
  centeredLocation: {value: number};
  barIsOpened: boolean;
  locationProvidingInfo: LocationProvidingInfo;
  organizationsCount$: Observable<number>;
  organizations$: Observable<Pageable<ApiOrganizationResponse[]>>;
  isOpenAccessPoint: { value: boolean, type: string; id: number; };
  station: BaseStation;
  defaultAreaId: number = 4;
  @ViewChild(BestMap) bestMap: BestMap;

  constructor(private locationsService: LocationsService,
              private readonly locationDetails: LocationDetailApi,
              private readonly accessPointsApi: AccessPointsApi,
              private readonly municipalitiesLayer: MunicipalitiesLayer,
              private readonly baseStationApi: BaseStationsApi,
              private readonly apiOrganization: ApiOrganization) {
    this.isLoading = false;
    this.barIsOpened = true;
  }

  ngOnInit() {
    this.isLoading = true;
    this.locationDetails.locationProvidingInfo(this.defaultAreaId).subscribe(info => {
      this.locationProvidingInfo = info;
      this.isLoading = false;
    });
  }

  /**
   * Событие выбора локации (при нажатии на маркер и при поиске)
   * требуется центрировать карту на точке и открыть окно инофрмации о локации
   * @param locationId - id локации
   * @param withFocusOnLocation - фокусироваться на локации
   * @param withLoadOrganizations - отображать организации
   */
  onSelectLocation(locationId: number, withFocusOnLocation: boolean = true, withLoadOrganizations = true): void {
    if (this.location && locationId === this.location.id) {
      return;
    }
    this.locationProvidingInfo = null;
    this.location = null;
    this.station = null;
    this.isLoading = true;
    if (withLoadOrganizations) {
      this.organizations$ = this.apiOrganization.organizationsByLocation(locationId);
    }
    if (withFocusOnLocation) {
      this.centerOnLocation(locationId);
    }
    this.openBar();
    this.organizationsCount$ = this.apiOrganization.count(locationId);
    this.locationsService.get(locationId).subscribe(
      (location) => {
        this.location = location;
        this.isLoading = false;
      },
      () => this.isLoading = false
    );
  }

  /**
   * Обработка события открытия или закрытия окна с информацией о локации
   * @param opened - открыто ли сейчас окно с информацией о локации
   */
  onToggleBar(opened: boolean): void {
    this.barIsOpened = opened;
    setTimeout(() => {
      this.bestMap.map.invalidateSize({animate: true});
    }, 400);
  }

  /**
   * Открыть окно с информацией о локации
   */
  openBar(): void {
    this.onToggleBar(true);
  }

  /**
   * Центрировать карту на локации
   * @param locationId - id локации
   */
  centerOnLocation(locationId: number): void {
    this.centeredLocation = {value: locationId};
  }

  onAreaClick(area: { feature: { id: number } }): void {
    this.location = null;
    this.station = null;
    this.organizations$ = null;
    this.locationDetails.locationProvidingInfo(area.feature.id).subscribe(info => {
      this.locationProvidingInfo = info;
    });
  }

  onOpenOrganizationInfo(location: LocationInfoBarValue): void {
  }

  onOpenAccessPointBar(accessPoint: AORAccessPoint): void {
    switch (accessPoint.type) {
      case 'ESPD':
        this.bestMap.addLayer('ESPD');
        break;
      case 'SMO':
        this.bestMap.addLayer('SMO');
        break;
    }
    setTimeout(() => {
      this.bestMap.moveToPoint(accessPoint.id, accessPoint.type);
    }, 100);
  }

  async onAccessPointClick(point: { type: string; id: number }): Promise<void> {
    const locationId = await this.accessPointsApi.getLocationId(point.id).toPromise();
    this.onSelectLocation(locationId, false, false);
    this.organizations$ = this.apiOrganization.organizationsByLocationWithAp(locationId, point.id).pipe(
      tap(() => {
        this.isOpenAccessPoint = {value: true, ...point};
      })
    );
  }

  onSelectGroup($event: number): void {
    this.municipalitiesLayer.selectMunicipality($event);
    this.onAreaClick({feature: {id: $event}});
  }

  onSelectBaseStation(baseStationId: number): void {
    this.baseStationApi.findOne(baseStationId).subscribe(station => {
      this.station = station;
      this.location = null;
      this.locationProvidingInfo = null;
      this.organizations$ = null;
    });
  }
}
