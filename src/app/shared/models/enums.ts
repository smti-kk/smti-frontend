export enum MailType {
  UPC = 'upc',
  MAIL_CONNECTION = 'post'
}

export const getStringSignalType = (signalType: SignalType[]): string => {
  return signalType.map(st => {
    if (st === SignalType.ATV) {
      return 'АТВ';
    } else if (st === SignalType.CTV) {
      return 'ЦТВ';
    }
  }).join(',');
};

export enum SignalType {
  ATV = 1,
  CTV = 2
}

export enum MobileGeneration {
  M2G = 1,
  M3G = 2,
  M4G = 3,
  M5G = 4
}
