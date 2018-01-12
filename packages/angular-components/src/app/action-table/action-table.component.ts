import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IAction} from "ht-models";
import { tableFormat, actionTableFormat } from "ht-data"
@Component({
  selector: 'ht-action-table',
  templateUrl: './action-table.component.html',
  styleUrls: ['./action-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionTableComponent implements OnInit {
  @Input() action: IAction;
  excludedKey = [
    'type',
    'lookup_id',
    'id',
    'short_code',
    'vehicle_type',
    'status',
    "created_at",
    "modified_at",
    'sub_status',
    'started_at',
    'tracking_url'
  ];
  constructor() { }

  ngOnInit() {
  }

  get tableData() {
    // let f = tableFormat(this.action, {excludes: this.excludedKey, format: {}});
    // console.log(f, "table");

    return tableFormat(this.action, {excludes: this.excludedKey, format: actionTableFormat});
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

}
