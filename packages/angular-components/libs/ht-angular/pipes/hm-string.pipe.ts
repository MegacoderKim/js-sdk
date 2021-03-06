import { Pipe, PipeTransform } from '@angular/core';
import {HMString} from "ht-utility";

@Pipe({
  name: 'hmString'
})
export class HmStringPipe implements PipeTransform {

  transform(value: any, args?: any, args2?: boolean): any {
    return HMString(value, args);
  }

}
