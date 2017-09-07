import { Pipe, PipeTransform } from '@angular/core';
import {GetUserSortingString} from "ht-js-data";

@Pipe({
  name: 'userSortingString'
})
export class UserSortingStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return GetUserSortingString(value);
  }

}
