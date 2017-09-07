import { Pipe, PipeTransform } from '@angular/core';
import {HMString} from "ht-js-utils";

@Pipe({
  name: 'hmString'
})
export class HmStringPipe implements PipeTransform {

  transform(value: any, args?: any, args2?: true): any {
    return HMString(value, args);
  }

}
