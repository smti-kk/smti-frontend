export enum MailType {
  UPC = 'upc',
  MAIL_CONNECTION = 'post'
}

export const getStringSignalType = (signalType: SignalType[]): string => {
  console.log(signalType);
  return signalType.map(st => {
    if (st === SignalType.ATV) {
      return 'АТВ';
    } else if (st === SignalType.CTV) {
      return 'ЦТВ';
    }
  }).join(',');
};

export enum TrunkChannelType {
  UNDEFINED,
  VOLS = 3,
  SATELLITE = 4,
  COPPER_CABLE = 5,
  RADIO_CHANEl = 6
}

export enum SignalType {
  ATV = 1,
  CTV = 2
}

export enum MobileGenerationType {
  M2G = 1,
  M3G = 2,
  M4G = 3,
  M5G = 4
}

export enum Quality {
  GOOD = 'good',
  NORMAL = 'normal',
  ABSENT = 'absent'
}
