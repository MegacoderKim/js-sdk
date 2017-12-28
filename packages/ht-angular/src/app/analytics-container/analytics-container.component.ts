import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AnalyticsItemsService} from "./analytics-items.service";
import {animate, query, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'ht-analytics-container',
  templateUrl: './analytics-container.component.html',
  styleUrls: ['./analytics-container.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('card-appear', [
      transition(":enter", [
        style({width: 0, height: 0, opacity: 0}),
        animate('200ms ease-in-out', style({width: "*", height: "*", opacity: 1}))
        ]),
      transition(":leave", [
        style({width: "*", height: "*", opacity: 0}),
        animate('200ms ease-in-out', style({width: 0, height: 0, opacity: 0}))
        ]),
      // transition(":enter", [
      //   style({transform: "translateX(-400px)"}),
      //   animate('200ms ease-in-out', style({transform: "translateX(0px)", opacity: 1}))
      //   ]),
      // transition(":leave", [
      //   style({transform: "translateX(0px)", opacity: 0}),
      //   animate('200ms ease-in-out', style({transform: "translateX(-400px)", opacity: 0}))
      //   ]),
      // transition("* <=> *", [
      //   // style({height: 0, opacity: 0}),
      //   query("ht-analytics-item:enter")
      //   ])
    ])
  ]
})
export class AnalyticsContainerComponent implements OnInit {
  configure: boolean = false;
  constructor(
    public analyticsItemsService: AnalyticsItemsService
  ) { }

  ngOnInit() {

  }

  openConfig() {
    this.configure = true
  }

}
