import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';
import { IAction } from "ht-models";
import {HMString} from "ht-utility";

@Component({
  selector: 'ht-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPopupComponent implements OnInit, OnChanges {
  @Input() action: IAction;
  opened: boolean = false;
  activityData: {
    title: string,
    body: string,
    showSubtext: boolean,
  } | null = {
    title: "speed",
    body: "",
    showSubtext: false
  };
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    const activity = this.action.activity.type;
    if (activity === 'stop' || activity === 'walk') {
      const duration = HMString(this.action.activity.duration, 60);
      this.activityData = {
        title: "For",
        body: "" + (duration || '--'),
        showSubtext: true
      };
    } else {
      this.activityData = null;
    }
  }

  openCard() {
    this.opened = !this.opened;
  }

}
