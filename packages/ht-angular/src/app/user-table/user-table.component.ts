import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IUserAnalytics, IUser} from "ht-models";
import { tableFormat, userTableFormat, actionTableFormat } from "ht-data";
import {IAction} from "ht-models";

@Component({
  selector: 'ht-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTableComponent implements OnInit {
  @Input() user: IUserAnalytics | IUser;
  @Input() action: IAction;
  excludedKey = [
    'name',
    'status',
    'photo',
    'created_at',
    'modified_at',
    'id',
    'availability_status',
    'location_status',
    'vehicle_type'
  ];
  constructor() { }

  ngOnInit() {
  }

  get tableData() {
    // let f = tableFormat(this.user, {excludes: this.excludedKey, format: {}});
    // console.log(f, "table");

    return tableFormat(this.user, {excludes: this.excludedKey, format: userTableFormat});
    // return Object.keys(this.user).reduce((acc, key) => {
    //   const value = this.user[key];
    //   if (typeof value === 'number' || typeof value === 'string' && this.isKeyIncluded(key)) {
    //     acc.push([key, value]);
    //     return acc
    //   } else {
    //     return acc
    //   }
    // }, [])
  }

  get actionData() {
    // let f = tableFormat(this.user, {excludes: this.excludedKey, format: {}});
    // console.log(f, "table");

    return tableFormat(this.user, {excludes: this.excludedKey, format: userTableFormat});
  }

  get currentUser() {
    return this.action ? this.action.user : this.user
  }

  isKeyIncluded(key) {
    return !!!this.excludedKey.includes(key)
  }

}
