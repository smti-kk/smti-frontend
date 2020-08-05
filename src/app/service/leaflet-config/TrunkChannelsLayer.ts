import {LayerGroup, Polyline} from 'leaflet';
import {TrunkChannelsApi} from '@api/trunk-channels/TrunkChannelsApi';

export class TrunkChannelsLayer extends LayerGroup {
  constructor(private channelsApi: TrunkChannelsApi) {
    super();
    channelsApi.list().subscribe(channels => {
      channels.map(channel => {
        let lineColor: string;
        switch (channel.operator.name) {
          case 'Билайн':
            lineColor = 'yellow';
            break;
          case 'Мегафон':
            lineColor = 'green';
            break;
          case 'Теле2':
            lineColor = 'black';
            break;
          case 'МТС':
            lineColor = 'red';
            break;
          case 'РТРС':
            lineColor = 'purple';
            break;
          case 'СибТТК':
            lineColor = 'lightblue';
            break;
          case 'Искра':
            lineColor = 'brown';
            break;
          case 'Ростелеком':
            lineColor = 'orange';
            break;
          case 'Неизвестный оператор':
            lineColor = '';
            break;
        }
        this.addLayer(new Polyline(
          [channel.locationStart.geoData.administrativeCenter, channel.locationEnd.geoData.administrativeCenter],
          {
            color: lineColor,
          }
        ));
      });
    });
  }
}
