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

  getStatus(action: IAction): string {
    const suffix = action.user.display.is_warning ? "" : " on";
    return action.user.display.status_text + suffix;
  }

  ngOnChanges() {
    switch (this.action.activity.type) {
      case "stop": {
        const duration = HMString(this.action.activity.duration, 60);
        this.activityData = {
          title: "Been here",
          body: "" + duration,
          showSubtext: true
        };
        break;
      };
      case "walk": {
        this.activityData = {
          title: "steps covered",
          body: "" + this.action.activity.steps,
          showSubtext: false
        };
        break;
      };
      default: {
        this.activityData = null;
      }
    }
  }

  openCard() {
    this.opened = !this.opened;
  }

}
