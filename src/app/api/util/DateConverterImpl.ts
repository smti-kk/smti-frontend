import {DateConverter} from './DateConverter';

export class DateConverterImpl implements DateConverter {
  convert(date: Date): string {
    return date.toISOString();
  }
}
