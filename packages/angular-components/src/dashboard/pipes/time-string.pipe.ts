import { Pipe, PipeTransform } from '@angular/core';
import {TimeString} from "../../utils/time-string";

@Pipe({
  name: 'timeString'
})
export class TimeStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return TimeString(value, args);
  }

}
