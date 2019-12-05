import { Component, Input, OnInit } from '@angular/core';
import { MobileGeneration, Provider, TrunkChannel, TrunkChannelType } from '@core/models';
import { SignalType, getStringSignalType } from '@core/models';

@Component({
  selector: 'app-providers-row',
  templateUrl: './technical-capabilities-row.component.html'
})
export class TechnicalCapabilitiesRowComponent implements OnInit {

  @Input() tcs: {
    provider: Provider,
    mobileGeneration?: MobileGeneration,
    channel?: TrunkChannel,
    type?: any,
    count?: number,
  }[];

  TrunkChannelType = TrunkChannelType;
  getStringSignalType = getStringSignalType;

  constructor() {
  }

  ngOnInit() {
  }

  getTvTypeString(types: { type: SignalType; name: string }[]) {
    console.log(types);
    if (!types) {
      return '';
    }
    return types
      .map(type => type.name)
      .join(',');
  }
}
