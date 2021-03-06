import {Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {IAction} from "ht-models";

@Component({
  selector: 'ht-action-summary',
  templateUrl: './action-summary.component.html',
  styleUrls: ['./action-summary.component.scss'],
  animations: [
    trigger('appear', [
      transition(":enter", [
        style({transform: `translateY(100px)`}),
        animate('300ms ease-out', style({transform: "*"}))
      ])
    ])
  ]
})
export class ActionSummaryComponent implements OnInit {
  @Input() action: IAction;
  @Input() test: string = "str";
  constructor() { }

  ngOnInit() {
  }

}
