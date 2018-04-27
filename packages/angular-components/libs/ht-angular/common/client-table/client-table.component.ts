import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Page } from "ht-models";
import {TableFormat} from "../interfaces";
import {shuffle} from "../animations"
@Component({
  selector: 'ht-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    shuffle
  ]
})
export class ClientTableComponent implements OnInit, OnChanges {
  @Input() data: Page<any>;
  @Input() loading: boolean;
  @Input() tableFormat: TableFormat[] = [];
  @Input() showSorting: boolean;
  @Input() query: object = {};
  @Output() addQuery: EventEmitter<object> = new EventEmitter<object>();
  @Output() onSelectData: EventEmitter<any> = new EventEmitter<any>();
  ordering: string;
  sign: boolean;

  constructor() { }

  ngOnChanges(change: SimpleChanges) {
    if (change.query) {
      const currentQuery = change.query.currentValue;
      this.fillOrdering(currentQuery);
    }
  }

  selectData(data) {
    this.onSelectData.next(data)
  }

  fillOrdering(query) {
    const ordering: string = query['ordering'];
    if (!ordering) return false;
    if (ordering[0] == '-') {
      this.ordering = ordering.substring(1);
      this.sign = false;
    } else {
      this.ordering = ordering;
      this.sign = true;
    }
  }

  setOrdering(key) {
    // if (!this.ordering) return false;
    const sign = key == this.ordering ? !this.sign : false;
    const ordering = `${sign ? '' : '-'}${key}`;
    this.addQuery.next({ordering})
  }

  ngOnInit() {
  }

  indexId(index, item) {
    return item.id
  }

  indexLabel(index, item) {
    return item.key
  }

}
