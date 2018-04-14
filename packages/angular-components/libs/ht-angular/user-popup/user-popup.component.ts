import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, HostBinding, ChangeDetectorRef} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import { IAction } from "ht-models";
import {HMString} from "ht-utility";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";
import {animate, style, transition, trigger, state} from '@angular/animations';

@Component({
  selector: 'ht-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // state('hide', style({opacity: 0})),
    trigger('fade', [
      state('hide', style({opacity: 0})),
      transition("show => hide", [
        animate('100ms ease-out', style({opacity: 0}))
      ]),
      transition("hide => show", [
        style({opacity: 0}),
        animate('100ms ease-in', style({opacity: 1}))
      ])
    ])
  ]
})
export class UserPopupComponent implements OnInit, OnChanges {
  @Input() action: IAction;
  @Input() idle$: Observable<boolean>;
  // @HostBinding('@fade') get slideIn() {
  //   return new AsyncPipe(this.ref).transform(this.idle$.pipe(map(data => data ? 'hide' : 'show')))
  // }
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
  constructor(public ref: ChangeDetectorRef) { }

  ngOnInit() {

  }

  ngOnChanges() {
    const activity = this.action.activity.type;
    if (this.action.user.display.is_warning) {
      this.activityData = {
        title: "Reason",
        body: this.action.user.display.status_text,
        showSubtext: true
      };
    } else if (activity === 'stop' || activity === 'walk') {
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
