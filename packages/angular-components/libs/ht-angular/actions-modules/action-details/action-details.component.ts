import { Component, OnInit, Input } from '@angular/core';
import {IAction} from "ht-models";

@Component({
  selector: 'ht-action-details',
  templateUrl: './action-details.component.html',
  styleUrls: ['./action-details.component.scss']
})
export class ActionDetailsComponent implements OnInit {
  @Input() action: IAction;
  constructor() { }

  ngOnInit() {
  }

}
