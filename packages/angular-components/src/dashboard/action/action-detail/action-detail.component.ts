import {Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter} from "@angular/core";
import {IAction} from "ht-models";
import {TaskCardIcon} from "../../asserts/task-card-marker";

@Component({
  selector: 'app-action-detail',
  templateUrl: './action-detail.component.html',
  styleUrls: ['./action-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionDetailComponent implements OnInit {
  @Input() action: IAction;
  @Input() hideUser: boolean = false;
  @Output() selectAction: EventEmitter<string | null> = new EventEmitter();
  icons = TaskCardIcon;
  constructor() { }

  ngOnInit() {
  }

  selectActionId(actionId: string) {
    this.selectAction.next(actionId)
  }

  unselectAction() {
    this.selectAction.next(null)
  }

}
