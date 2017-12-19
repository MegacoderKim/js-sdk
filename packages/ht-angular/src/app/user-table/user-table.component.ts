import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IUserAnalytics} from "ht-models/dist/typings/user";

@Component({
  selector: 'ht-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTableComponent implements OnInit {
  @Input() user: IUserAnalytics;
  excludedKey = [
    'name',
    'status',
    'photo'
  ]
  constructor() { }

  ngOnInit() {
  }

  get tableData() {
    return Object.keys(this.user).reduce((acc, key) => {
      const value = this.user[key];
      if (typeof value === 'number' || typeof value === 'string' && this.isKeyIncluded(key)) {
        acc.push([key, value]);
        return acc
      } else {
        return acc
      }
    }, [])
  }

  isKeyIncluded(key) {
    return !!!this.excludedKey.includes(key)
  }

}
