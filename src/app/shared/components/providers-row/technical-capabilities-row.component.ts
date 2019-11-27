import { Component, Input, OnInit } from '@angular/core';
import { Provider, TrunkChannel, TrunkChannelType } from '@shared/models/location-capabilities';
import { SignalType, getStringSignalType } from '@shared/models/enums';

@Component({
  selector: 'app-providers-row',
  templateUrl: './technical-capabilities-row.component.html'
})
export class TechnicalCapabilitiesRowComponent implements OnInit {

  @Input() tcs: {
    provider: Provider,
    mobileGeneration?: string,
    channel?: TrunkChannel,
    type?: SignalType[],
    count?: number
  }[];

  TrunkChannelType = TrunkChannelType;
  getStringSignalType = getStringSignalType;

  constructor() {
  }

  ngOnInit() {
  }

  hasProvider(tcs: { provider: Provider; mobileGeneration?: string; channel?: TrunkChannel; type?: SignalType[]; count?: number }[]) {
    return tcs.find(t => t.provider.isActive === true);
  }
}
