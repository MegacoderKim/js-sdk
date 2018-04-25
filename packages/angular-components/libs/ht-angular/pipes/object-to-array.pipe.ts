import { Pipe, PipeTransform } from '@angular/core';
import {objectToStringArray} from "ht-utility";

@Pipe({
  name: 'objectToArray'
})
export class ObjectToArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? objectToStringArray(value) : value;
  }

}
