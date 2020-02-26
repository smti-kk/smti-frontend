export enum MailType {
  UPC = 'upc',
  MAIL_CONNECTION = 'post',
}

export enum SignalType {
  ATV = 1,
  CTV = 2,
}

export enum Quality {
  GOOD = 'good',
  NORMAL = 'normal',
  ABSENT = 'absent',
}

export const qualityToString = (quality: Quality) => {
  switch (quality) {
    case Quality.ABSENT:
      return 'Отутствует';
    case Quality.GOOD:
      return 'Хорошо';
    case Quality.NORMAL:
      return 'Удовлетворительно';
  }
};
