import {Component, OnInit, Input} from '@angular/core';
import {IAction} from "ht-models";
import {TaskCardIcon} from "../../asserts/task-card-marker";

@Component({
  selector: 'app-actions-timeline',
  templateUrl: './actions-timeline.component.html',
  styleUrls: ['./actions-timeline.component.less']
})
export class ActionsTimelineComponent implements OnInit {
  @Input() action: IAction;
  icons = TaskCardIcon;

  constructor() { }

  ngOnInit() {
  }

}
