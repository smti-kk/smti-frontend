import { Pipe, PipeTransform } from '@angular/core';
import {DLocationBase} from '@api/dto/DLocationBase';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  transform(value: DLocationBase[], args: string): unknown {
    const rez: string[] = [];
    value.forEach(item => {
      let s = `${item.type}. ${item.name}`;
      if (item.parent){
        s += ` (${item.parent.type}. ${item.parent.name})`;
      }
      rez.push(s);
    });
    return rez.join(args);
  }

}
