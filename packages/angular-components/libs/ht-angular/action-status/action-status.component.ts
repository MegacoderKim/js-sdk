import {Component, Input, OnInit} from '@angular/core';
import {IAction} from "ht-models";

@Component({
  selector: 'ht-action-status',
  templateUrl: './action-status.component.html',
  styleUrls: ['./action-status.component.scss']
})
export class ActionStatusComponent implements OnInit {
  @Input() action: IAction;

  constructor() { }

  ngOnInit() {
  }

}
