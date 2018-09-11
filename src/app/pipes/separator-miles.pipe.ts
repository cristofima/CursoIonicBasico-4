import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separatorMiles'
})
export class SeparatorMilesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
