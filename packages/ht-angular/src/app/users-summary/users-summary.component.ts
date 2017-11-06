import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUserListSummary} from "ht-models";

@Component({
  selector: 'ht-users-summary',
  templateUrl: './users-summary.component.html',
  styleUrls: ['./users-summary.component.less']
})
export class UsersSummaryComponent implements OnInit {
  @Output() setQuery: EventEmitter<object> = new EventEmitter();
  @Output() clearQueryKey: EventEmitter<string> = new EventEmitter();
  @Input() summary;
  @Input() hideTotal;

  constructor() { }

  ngOnInit() {

  }

  indexId(index, item) {
    return item.label
  }

  setFilter(datum) {
    const query = {status: datum.values.toString()};
    this.setQuery.next(query)
  }

  clearFilter(datum) {
    this.clearQueryKey.next('status')
  }

  selectLabel(datum) {
    if (datum.selected) {
      this.clearFilter(datum)
    } else {
      this.setFilter(datum)
    }
  }

}
