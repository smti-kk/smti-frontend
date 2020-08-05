import {LocationsPointsService} from '../locations/LocationsPointsService';
import {HttpClient} from '@angular/common/http';
import {LocationPointsConverter} from '@service/locations';
import {MapLocationsApiImpl} from '@api/locations/MapLocationsApiImpl';
import {BoundsToStringConverter} from '@api/util/bounds.to.string.converter';
import {Injectable} from '@angular/core';
import {PSWithUniqueResponseParts} from '../points/PSWithUniqueResponseParts';
import {PSFullPreloaded} from '../points/PSFullPreloaded';
import {ESPDPointsService} from '../access-points/ESPDPointsService';
import {MapAccessPointsApiImpl} from '@api/access-points/MapAccessPointsApiImpl';
import {SMOPointsService} from '../access-points/SMOPointsService';
import {AccessPointsConverter} from '../access-points/AccessPointsConverter';
import {LocationsLayer} from './LocationsLayer';
import {LayerWithState} from './LayerWithState';
import {PointLayerControllerImpl} from './PointLayerControllerImpl';
import {PLClickable} from './PLClickable';
import {PLWithLoader} from './PLWithLoader';
import {PointLayerController} from './PointLayerController';
import {PointUniquenessFilterImpl} from '../points/PointUniquenessFilterImpl';
import {PLCWithReloadInterval} from './PLCWithReloadInterval';
import {MAPAWithModificationsOnlyAndIgnoreBounds} from '@api/access-points/MAPAWithModificationsOnlyAndIgnoreBounds';
import {DateConverterImpl} from '@api/util/DateConverterImpl';
import {AccessPointsModificationsApiImpl} from '@api/access-points/AccessPointsModificationsApiImpl';
import {ESPDIconFromState} from '@service/access-points/ESPDIconFromState';
import {SMOIconFromState} from '@service/access-points/SMOIconFromState';
import {BaseStationsPointsService} from '@service/points/BaseStationsPointsService';
import {BaseStationsApi} from '@api/base-stations/BaseStationsApi';
import {BaseStationsLayer} from "@service/leaflet-config/BaseStationsLayer";

@Injectable()
export class LayerControllersFactory {
  constructor(private httpClient: HttpClient) {
  }

  locationLayerController(): PointLayerController {
    return new PLCWithReloadInterval(
      new PointLayerControllerImpl(
        new PLClickable(
          new PLWithLoader(
            new LocationsLayer(
              new PSWithUniqueResponseParts(
                new PSFullPreloaded(
                  new LocationsPointsService(
                    new MapLocationsApiImpl(
                      this.httpClient,
                      new BoundsToStringConverter()
                    ),
                    new LocationPointsConverter()
                  )
                ),
                new PointUniquenessFilterImpl()
              )
            )
          )
        )
      ),
      500
    );
  }

  espdLayerController(): PointLayerController {
    return new PLCWithReloadInterval(
      new PointLayerControllerImpl(
        new PLClickable(
          new LayerWithState(
            new PSWithUniqueResponseParts(
              new ESPDPointsService(
                new MAPAWithModificationsOnlyAndIgnoreBounds(
                  new MapAccessPointsApiImpl(
                    this.httpClient,
                    new BoundsToStringConverter()
                  ),
                  new AccessPointsModificationsApiImpl(this.httpClient),
                  new DateConverterImpl()
                ),
                new AccessPointsConverter(
                  new ESPDIconFromState()
                )
              ),
              new PointUniquenessFilterImpl()
            ),
            'espd'
          ),
        )
      ),
      500
    );
  }

  smoLayerLayerController(): PointLayerController {
    return new PLCWithReloadInterval(
      new PointLayerControllerImpl(
        new PLClickable(
          new LayerWithState(
            new PSWithUniqueResponseParts(
              new SMOPointsService(
                new MAPAWithModificationsOnlyAndIgnoreBounds(
                  new MapAccessPointsApiImpl(
                    this.httpClient,
                    new BoundsToStringConverter()
                  ),
                  new AccessPointsModificationsApiImpl(this.httpClient),
                  new DateConverterImpl()
                ),
                new AccessPointsConverter(
                  new SMOIconFromState()
                )
              ),
              new PointUniquenessFilterImpl()
            ),
            'smo'
          )
        )
      ),
      500
    );
  }

  baseStationsLayerLayerController(): PointLayerController {
    return new PLCWithReloadInterval(
      new PointLayerControllerImpl(
        new PLClickable(
          new PLWithLoader(
            new BaseStationsLayer(
              new PSWithUniqueResponseParts(
                new PSFullPreloaded(
                  new BaseStationsPointsService(
                    new BaseStationsApi(
                      this.httpClient,
                    )
                  )
                ),
                new PointUniquenessFilterImpl()
              )
            )
          )
        )
      ),
      500
    );
  }
}
