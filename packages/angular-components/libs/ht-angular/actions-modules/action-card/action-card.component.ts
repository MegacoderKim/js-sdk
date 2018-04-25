import { Component, OnInit, Input } from '@angular/core';
import {IAction} from "ht-models";

@Component({
  selector: 'ht-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss']
})
export class ActionCardComponent implements OnInit {

  @Input() action: IAction;
  constructor() {

  }

  ngOnInit() {

  }

}
