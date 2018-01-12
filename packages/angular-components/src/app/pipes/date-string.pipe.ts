import { Pipe, PipeTransform } from '@angular/core';
import {htAction} from "ht-data";
import {DateString} from "ht-utility";

@Pipe({
  name: 'dateString'
})
export class DateStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return DateString(value, args);
  }

}
