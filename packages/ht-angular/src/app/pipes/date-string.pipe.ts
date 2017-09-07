import { Pipe, PipeTransform } from '@angular/core';
import {DateString} from "ht-js-utils";

@Pipe({
  name: 'dateString'
})
export class DateStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return DateString(value, args);
  }

}
