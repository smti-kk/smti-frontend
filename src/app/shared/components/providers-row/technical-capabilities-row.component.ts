import { Component, Input, OnInit } from '@angular/core';
import { Provider, TrunkChannel, TrunkChannelType } from '@shared/models/location-capabilities';

@Component({
  selector: 'app-providers-row',
  templateUrl: './technical-capabilities-row.component.html'
})
export class TechnicalCapabilitiesRowComponent implements OnInit {

  @Input() tcs: {
    provider: Provider,
    mobileGeneration?: string,
    channel?: TrunkChannel,
    type?: string,
    count?: number
  }[];

  TrunkChannelType = TrunkChannelType;

  constructor() {
  }

  ngOnInit() {
    console.log(this.tcs);
  }

  hasProvider(tcs: { provider: Provider; mobileGeneration?: string; channel?: TrunkChannel; type?: string; count?: number }[]) {
    return tcs.find(t => t.provider.isActive === true);
  }
}
