import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUserAnalyticsPage} from "ht-models";

@Component({
  selector: 'ht-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  @Input() userPage: IUserAnalyticsPage;
  @Output() onSelectUser: EventEmitter<string | null> = new EventEmitter();
  @Output() onSelectUserData: EventEmitter<string | null> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  indexId(index, item) {
    return item.id
  }

}
