import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(listArray: any[], field: string, search: string = ''): any[] {
    if(!search.trim()){
      return listArray
    }

    return listArray.filter(item => {
      return item[field].toLowerCase().includes(search.toLowerCase());
    })
  }

}
