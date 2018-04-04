import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {CardComponent} from "../../../shared/card/card.component";
import {IAction} from "ht-models";
import {ActionCardIcon, TaskCardIcon} from "../../../asserts/task-card-marker";
import {anim} from "../../../../utils/animations";
import {ActivatedRoute, Router} from "@angular/router";
import {config} from '../../../config';

@Component({
  selector: 'app-live-action',
  templateUrl: './live-action.component.html',
  styleUrls: ['./live-action.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
      anim.cardDetail
  ]
})
export class LiveActionComponent extends CardComponent implements OnInit {
  @Input() action: IAction;
  icons = ActionCardIcon;
  timezone = config.timezone;
  constructor(public router: Router, public route: ActivatedRoute) {
    super(router, route)
  }


  get link() {
    return [this.baseUrl, {id: this.action.id} ]
  }
  // icons(type) {
  //   return TaskCardAssets[type] || TaskCardAssets['task']
  // }

}
