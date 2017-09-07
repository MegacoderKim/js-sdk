import {Pipe, PipeTransform} from "@angular/core";
import {htAction} from "ht-js-data";

@Pipe({
  name: 'actionStatusString'
})
export class ActionStatusStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return htAction().getFilterString(value);
  }

}
