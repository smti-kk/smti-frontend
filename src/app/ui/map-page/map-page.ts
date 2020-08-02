import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationInfoBarValue} from '@service/dto/LocationInfoBarValue';
import {Observable} from 'rxjs';
import {LocationsService} from '@service/locations/LocationsService';
import {BestMap} from './map/BestMap';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'map-page',
  templateUrl: './map-page.html',
  styleUrls: ['./map-page.scss'],
})
export class MapPage {
  location$: Observable<LocationInfoBarValue>;
  isLoading: boolean;
  centeredLocation: number;
  barIsOpened: boolean;
  @ViewChild(BestMap) bestMap: BestMap;

  constructor(private locationsService: LocationsService) {
    this.isLoading = false;
    this.barIsOpened = true;
  }

  /**
   * Событие выбора локации (при нажатии на маркер и при поиске)
   * требуется центрировать карту на точке и открыть окно инофрмации о локации
   * @param locationId - id локации
   */
  onSelectLocation(locationId: number): void {
    this.isLoading = true;
    this.centerOnLocation(locationId);
    this.openBar();
    this.location$ = this.locationsService.get(locationId).pipe(
      tap(
        (location) => {
          this.isLoading = false;
        },
        () => this.isLoading = false
      )
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
    this.centeredLocation = locationId;
  }
}
