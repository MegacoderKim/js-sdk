import { Pipe, PipeTransform } from '@angular/core';
// import {GetUserStatusString} from "ht-js-data";

@Pipe({
  name: 'usersStatusString'
})
export class UsersStatusStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (status.split(',').length === 4) return 'Fit to map';
    // return GetUserStatusString(value)
  }

}
