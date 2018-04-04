import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {CardComponent} from "../../../shared/card/card.component";
import {IUser, IUserAnalytics} from "ht-models";
import {anim} from "../../../../utils/animations";
import {ActivatedRoute, Router} from "@angular/router";
import {config} from '../../../config';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.less'],
  animations: [
      anim.cardDetail
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveUserComponent extends CardComponent{
  @Input() user: IUserAnalytics;
  @Input() isToday: boolean = true;
  timezone = config.timezone;
  constructor(
    public router: Router,
    public route: ActivatedRoute
) {
    super(router, route)
  }

  get link() {
    return [this.baseUrl, {id: this.user.id} ]
  }

}
