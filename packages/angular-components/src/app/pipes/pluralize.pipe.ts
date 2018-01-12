import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize'
})
export class PluralizePipe implements PipeTransform {

  transform(value: string, args: number, suffix: string = 's', singularSuffix: string = ''): any {
    if (args && typeof args === 'number') {
      return args > 1 ? value + suffix : value + singularSuffix;
    }
    return value;
  }

}
