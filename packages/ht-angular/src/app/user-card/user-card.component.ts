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
  @Output() onSelectPlaceline = new EventEmitter();
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

  ngOnChanges(a) {
    // console.log(a.user.currentValue, "change");
    this.showStatus = this.getShowStatus(a.user.currentValue)
  }

}
