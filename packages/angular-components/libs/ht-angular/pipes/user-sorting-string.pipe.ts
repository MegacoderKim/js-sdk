import { Pipe, PipeTransform } from '@angular/core';
import {DefaultUsersFilter} from "ht-client";
import {htUser} from "ht-data";

@Pipe({
  name: 'userSortingString'
})
export class UserSortingStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return htUser().sortingQueryMap[value] || value;
  }

}
