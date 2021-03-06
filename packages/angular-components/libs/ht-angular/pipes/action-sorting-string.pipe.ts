import {Pipe, PipeTransform} from '@angular/core';
import {htAction} from "ht-data";

@Pipe({
  name: 'actionSortingString'
})
export class ActionSortingStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return htAction().getSortingString(value);
  }

}
