import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'pointType',
})
export class PointTypePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'ESPD':
        return 'ЕСПД';
      case 'RSMO':
        return 'РСЗО';
      case 'SMO':
        return 'СЗО';
      case 'ZSPD':
        return 'ЗСПД';
      case 'CONTRACT':
        return 'Контракт';
      default:
        return null;
    }
  }
}
