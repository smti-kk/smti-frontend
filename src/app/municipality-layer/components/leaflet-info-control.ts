import { Control, ControlOptions, DomUtil } from 'leaflet';
import LocationSummaryCapability from '../../shared/model/location-summary-capability';
import LocationArea from '../../shared/model/location-area';

export default class LeafletInfoControl extends Control {
  constructor(private locationSummaryCapabilities: LocationSummaryCapability[], options?: ControlOptions) {
    super(options);
  }

  public onAdd(): HTMLElement {
    const div = DomUtil.create('div', 'leaflet-info-control');
    div.innerHTML = this.updateLocationCapabilitiesInfo();
    return div;
  }

  public show(layer: LocationArea) {
    if (this.locationSummaryCapabilities) {
      this.getContainer().innerHTML = this.updateLocationCapabilitiesInfo(this.locationSummaryCapabilities, layer);
    }
  }

  public hide() {
    this.getContainer().innerHTML = this.updateLocationCapabilitiesInfo();
  }

  private updateLocationCapabilitiesInfo(locationCapabilities?: LocationSummaryCapability[], locationArea?: LocationArea): string {
    let numbersOfObject = 0;
    let numbersOfInternet = 0;
    let numbersOfMobile = 0;
    let numbersOfATB = 0;
    let numbersOfCTB = 0;

    if (locationArea) {
      locationCapabilities.forEach(location => {
        if (location.area === locationArea.id) {
          numbersOfObject++;
          if (location.internet && location.internet.data.length !== 0) {
            numbersOfInternet++;
          }
          if (location.mobile && location.mobile.data.length !== 0) {
            numbersOfMobile++;
          }
          if (location.tv && location.tv.data.length !== 0) {
            location.tv.data.forEach(type => {
              type.signal_type.forEach(signal => {
                if (signal === '1') {
                  numbersOfATB++;
                } else {
                  numbersOfCTB++;
                }
              });
            });
          }
        }
      });
    }

    return '<div><h4>Информация о муниципальном образовании</h4>' + (locationArea ?
      '<strong>' + locationArea.properties.name + '</strong><br />'
      + '<br />' + 'Количество населенных пунктов: ' + numbersOfObject
      + '<br />' + 'Интернет: ' + numbersOfInternet + '/' + numbersOfObject
      + '<br />' + 'Мобильная связь: ' + numbersOfMobile + '/' + numbersOfObject
      + '<br />' + 'АТВ: ' + numbersOfATB + '/' + numbersOfObject
      + '<br />' + 'ЦТВ: ' + numbersOfCTB + '/' + numbersOfObject +
      '</div>'

      : 'Наведите на муниципальное образование');
  }
}
