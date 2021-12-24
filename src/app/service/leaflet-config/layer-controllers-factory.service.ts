import { PointState } from './../points/PointState';
import {LocationsPointsService} from '../locations/LocationsPointsService';
import {HttpClient} from '@angular/common/http';
import {LocationPointsConverter} from '@service/locations';
import {MapLocationsApiImpl} from '@api/locations/MapLocationsApiImpl';
import {BoundsToStringConverter} from '@api/util/bounds.to.string.converter';
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
import {TrunkChannelFilters, TrunkChannelsLayer} from '@service/leaflet-config/TrunkChannelsLayer';
import {BaseStationsLayer} from '@service/leaflet-config/BaseStationsLayer';
import {CellularType} from '@api/dto/CellularType';
import {TrunkChannel} from '@api/dto/TrunkChannel';
import {MapAccessPointsApi} from '@api/access-points/MapAccessPointsApi';
import {MapLocationsApiWithCellular} from '@api/locations/MapLocationsApiWithCellular';
import {MapLocationsApiWithoutCellular} from '@api/locations/MapLocationsApiWithoutCellular';
import {ZSPDPointsService} from "@service/access-points/ZSPDPointsService";
import {ZSPDIconFromState} from "@service/access-points/ZSPDIconFromState";

export class LayerControllersFactory {
  private readonly mapAccessPointApi: MapAccessPointsApi & {filter? : PointState} ;

  constructor(private httpClient: HttpClient) {
    this.mapAccessPointApi = new MapAccessPointsApiImpl(
      this.httpClient,
      new BoundsToStringConverter()
    );
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
      500 // dont touch me
    );
  }

  espdLayerController(pointState?: PointState): PointLayerController {
    return new PLCWithReloadInterval(
      new PointLayerControllerImpl(
        new PLClickable(
          new LayerWithState(
            new PSWithUniqueResponseParts(
              new ESPDPointsService(
                new MAPAWithModificationsOnlyAndIgnoreBounds(
                  this.mapAccessPointApi,
                  new AccessPointsModificationsApiImpl(this.httpClient),
                  new DateConverterImpl(),
                  pointState,
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
      2000
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
                  this.mapAccessPointApi,
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
      2000
    );
  }

  zspdLayerLayerController(pointState?: PointState): PointLayerController {
    return new PLCWithReloadInterval(
      new PointLayerControllerImpl(
        new PLClickable(
          new LayerWithState(
            new PSWithUniqueResponseParts(
              new ZSPDPointsService(
                new MAPAWithModificationsOnlyAndIgnoreBounds(
                  this.mapAccessPointApi,
                  new AccessPointsModificationsApiImpl(this.httpClient),
                  new DateConverterImpl(),
                  pointState,
                ),
                new AccessPointsConverter(
                  new ZSPDIconFromState()
                )
              ),
              new PointUniquenessFilterImpl()
            ),
            'zspd'
          )
        )
      ),
      2000
    );
  }

  baseStationsLayerLayerController(mobileTypes: CellularType[]): PointLayerController {
    return new PLCWithReloadInterval(
      new PointLayerControllerImpl(
        new PLClickable(
          // new PLWithLoader(
          new BaseStationsLayer(
            new PSWithUniqueResponseParts(
              new PSFullPreloaded(
                new BaseStationsPointsService(
                  new BaseStationsApi(
                    this.httpClient,
                  ),
                )
              ),
              new PointUniquenessFilterImpl()
            ),
            mobileTypes
          )
          // )
        )
      ),
      500
    );
  }

  trunkChannelsLayer(channels: TrunkChannel[], filters: TrunkChannelFilters): TrunkChannelsLayer {
    return new TrunkChannelsLayer(channels, filters);
  }

  locationsLayerControllerWithoutCellular(): PointLayerController {
    return new PLCWithReloadInterval(
      new PointLayerControllerImpl(
        new PLClickable(
          new PLWithLoader(
            new LocationsLayer(
              new PSWithUniqueResponseParts(
                new PSFullPreloaded(
                  new LocationsPointsService(
                    new MapLocationsApiWithoutCellular(
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
      500 // dont touch me
    );
  }

  locationsLayerControllerWithCellular(): PointLayerController {
    return new PLCWithReloadInterval(
      new PointLayerControllerImpl(
        new PLClickable(
          new PLWithLoader(
            new LocationsLayer(
              new PSWithUniqueResponseParts(
                new PSFullPreloaded(
                  new LocationsPointsService(
                    new MapLocationsApiWithCellular(
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
      500 // dont touch me
    );
  }
}
