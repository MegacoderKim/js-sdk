import { Pipe, PipeTransform } from '@angular/core';
import {DotString} from "../../utils/dot-string";

@Pipe({
  name: 'dot'
})
export class DotPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return DotString(value, args);
  }

}
