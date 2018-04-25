import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import {IAction} from "ht-models";

@Component({
  selector: 'ht-action-dot',
  templateUrl: './action-dot.component.html',
  styleUrls: ['./action-dot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionDotComponent implements OnInit {
  @Input() action: IAction;
  constructor() { }

  ngOnInit() {
  }

}
