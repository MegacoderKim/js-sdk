import {Component, OnInit, Input, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import {IUserPlaceline} from "ht-models";
import * as _ from "underscore";
import {HtPlaceline} from "ht-data";

@Component({
  selector: 'app-users-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent implements OnInit, OnChanges {
  @Input() user: IUserPlaceline;
  showStatus: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  getShowStatus(user: IUserPlaceline): boolean {
    return new HtPlaceline().isLive(user)
  }

  ngOnChanges(a) {
    // console.log(a.user.currentValue, "change");
    this.showStatus = this.getShowStatus(a.user.currentValue)
  }

}
