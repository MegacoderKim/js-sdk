import { Component, OnInit } from '@angular/core';
import { TrackingService } from './tracking.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
  animations: [
    trigger('appear', [
      transition(":enter", [
        style({transform: `translateY(100px)`}),
        animate('300ms ease-out', style({transform: "*"}))
      ])
    ])
  ]
})
export class TrackingComponent implements OnInit {
  url = "ofE2gTfo";
  init: boolean = false;
  actionsData$;
  constructor(
    private trackinService: TrackingService
  ) {
  }

  ngOnInit() {
    this.trackinService.initShortCode(this.url);
    this.actionsData$ = this.trackinService.trackActions.actions$;
    console.log(this.trackinService.trackActions);
    this.init = true;
  }

}
