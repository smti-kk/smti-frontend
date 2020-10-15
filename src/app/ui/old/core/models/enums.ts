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

export type ParticipationStatus = 'DONE' | 'NONE' | 'PLAN';

export const qualityToString = (quality: Quality): string => {
  switch (quality) {
    case Quality.ABSENT:
      return 'Отсутствует';
    case Quality.GOOD:
      return 'Хорошо';
    case Quality.NORMAL:
      return 'Удовлетворительно';
    case null:
      return 'Отсутствует';
    default:
      return 'Отсутствует';
  }
};

export const participationStatusToString = (status: ParticipationStatus) => {
  switch (status) {
    case 'DONE':
      return 'Исполнено';
    case 'NONE':
      return 'Не исполнено';
    case 'PLAN':
      return 'План';
  }
};
