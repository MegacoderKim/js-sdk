import {
  ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnInit,
  Output
} from '@angular/core';
import {IUser, IUserAnalytics, IUserData} from "ht-models";
import * as _ from "underscore";

@Component({
  selector: 'ht-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent implements OnInit, OnChanges {
  @Input() user: IUserData | IUserAnalytics | IUser;
  @Input() selectedUserId: string | null = null;
  @Input() action: 'default' | 'close' | 'detail' = 'default';
  @Output() onAction = new EventEmitter();
  showStatus: boolean = true;
  @HostBinding('class') role = 'card flex-column clickable';
  constructor() { }

  ngOnInit() {
  }

  getShowStatus(user: IUserData): boolean {
    if (user.segments) {
      return !!user.segments.length && ! _.last(user.segments)['ended_at']
    }
    return !!user
  }

  fireAction() {
    this.onAction.next({user: this.user, action: this.action});
    event.stopPropagation()
  }

  ngOnChanges(a) {
    // console.log(a, "change");
    this.showStatus = a.user ? this.getShowStatus(a.user.currentValue) : this.showStatus
  }

  getActionText() {
    switch (this.action) {
      case  "close":
        return "Close";
      case "detail" :
        return "";
      default:
        return "View on Map"
    }
  }

  debug(e) {
    console.log(e);
  }

}
