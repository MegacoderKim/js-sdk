import { Pipe, PipeTransform } from '@angular/core';
import {DateString} from "../../utils/date-string";

@Pipe({
  name: 'dateString'
})
export class DateStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return DateString(value, args);
  }

}
