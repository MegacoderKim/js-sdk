import { Pipe, PipeTransform } from '@angular/core';
import {DotString} from "ht-utility";

@Pipe({
  name: 'dot'
})
export class DotPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return DotString(value, args);
  }

}
