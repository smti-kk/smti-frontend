import { Pipe, PipeTransform } from '@angular/core';
import {DOrganizationBase} from '../../../api/dto/DOrganizationBase';

@Pipe({
  name: 'joinorg'
})
export class JoinorgPipe implements PipeTransform {

  transform(value: DOrganizationBase[], args: string): string {
    if (!value) {
      return '';
    }
    const rez: string[] = [];
    value.forEach(item => {
      rez.push(`${item.name}`);
    });
    return rez.join(args);
  }

}
