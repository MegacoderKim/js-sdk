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
  activityData = {
    title: "speed",
    body: ""
  };
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    switch (this.action.activity.type) {
      case "stop": {
        const duration = HMString(this.action.activity.duration, 60);
        this.activityData = {
          title: "been here",
          body: "" + duration
        };
        break;
      };
      case "walk": {
        this.activityData = {
          title: "steps covered",
          body: "" + this.action.activity.step_count
        };
        break;
      };
      default: {
        this.activityData = {
          title: "speed",
          body: "--"
        };
      }
    }
  }

  openCard() {
    this.opened = !this.opened;
  }

}
