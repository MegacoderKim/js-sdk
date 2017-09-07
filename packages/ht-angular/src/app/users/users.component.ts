import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUserAnalytics, IUserAnalyticsPage} from "ht-models";

@Component({
  selector: 'ht-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  userCardAction;
  @Input() users: IUserAnalytics[];
  @Input() selectedUserId: string | null;
  @Input() selectedUserDataId: string | null;
  @Output() onSelectUser: EventEmitter<string | null> = new EventEmitter();
  @Output() onAction: EventEmitter<string | null> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }



  getAction(user) {
    // console.log("action", this.selectedUserDataId, this.selectedUserId);
    if (this.selectedUserId === user.id) {
      return "close"
    } else if (this.selectedUserDataId === user.id) {
      return 'detail';
    } else {
      return "default"
    }
  }

  indexId(index, item) {
    return item.id
  }

}
