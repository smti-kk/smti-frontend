import {LayerGroup, Polyline} from 'leaflet';
import {TrunkChannel} from '@api/dto/TrunkChannel';
import {InternetType} from '@api/dto/InternetType';
import {
  BEELINE_COLOR, ISKRA_COLOR,
  MEGAPHONE_COLOR,
  MTS_COLOR, ROSTELECOM_COLOR,
  RTRS_COLOR,
  SIBTTK_COLOR,
  TELE2_COLOR, UNKNOWN_COLOR
} from "../../../environments/styles";

export interface TrunkChannelFilters {
  channelTypes: InternetType[];
  operatorNames: string[];
}

export class TrunkChannelsLayer extends LayerGroup {
  constructor(private channels: TrunkChannel[], filters: TrunkChannelFilters) {
    super();
    channels
      .filter(channel => {
        if (filters.channelTypes.length > 0 && filters.operatorNames.length > 0) {
          return filters.channelTypes.indexOf(channel.typeTrunkChannel.name) !== -1 &&
            filters.operatorNames.indexOf(channel.operator.name) !== -1;
        } else {
          if (filters.channelTypes.length > 0) {
            return filters.channelTypes.indexOf(channel.typeTrunkChannel.name) !== -1;
          }
          if (filters.operatorNames.length > 0) {
            return filters.operatorNames.indexOf(channel.operator.name) !== -1;
          }
        }
        return false;
      })
      .forEach(channel => {
        let lineColor: string;
        switch (channel.operator.name) {
          case 'Билайн':
            lineColor = BEELINE_COLOR;
            break;
          case 'Мегафон':
            lineColor = MEGAPHONE_COLOR;
            break;
          case 'Теле2':
            lineColor = TELE2_COLOR;
            break;
          case 'МТС':
            lineColor = MTS_COLOR;
            break;
          case 'РТРС':
            lineColor = RTRS_COLOR;
            break;
          case 'СибТТК':
            lineColor = SIBTTK_COLOR;
            break;
          case 'Искра':
            lineColor = ISKRA_COLOR;
            break;
          case 'Ростелеком':
            lineColor = ROSTELECOM_COLOR;
            break;
          case 'Неизвестный оператор':
            lineColor = UNKNOWN_COLOR;
            break;
        }
        this.addLayer(new Polyline(
          [channel.locationStart.geoData.administrativeCenter, channel.locationEnd.geoData.administrativeCenter],
          {
            color: lineColor,
          }
        ));
      });
  }
}
