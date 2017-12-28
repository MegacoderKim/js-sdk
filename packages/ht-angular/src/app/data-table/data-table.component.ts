import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ht-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit {
  @Input() tableData;
  @Input() clickable: boolean = false;
  @Output() select = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  selectRow(row) {
    if(this.clickable) {
      this.select.next(row)
    }
  }

}
