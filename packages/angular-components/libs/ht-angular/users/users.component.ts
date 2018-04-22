import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IUserAnalytics, IUserAnalyticsPage} from "ht-models";
// import {entryLeaveTransition} from "../../animations/appear";
// import {anim} from "../../animations/appear";
import {animate, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";
import {Observable} from "rxjs/Observable";
import {cardStackFn, shuffle} from "../common/animations";

@Component({
  selector: 'ht-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    shuffle,
    trigger('card', [
      transition(':enter', [
        style({transform: 'translateX(-100px)', height: 0, opacity: 0}),
        animate('0.3s' + ' ease-out')
      ]),
      transition(':leave', [
        style({transform: 'translateX(0px)', height: '*', opacity: 1}),
        animate('0.3s' + ' ease-in', style({transform: 'translateX(-100px)', height: 0, opacity: 0}))
      ])
      ]
    ),
    trigger('appear', [
      transition(':enter', [
        style({transform: 'translateX(-100px)', height: 0, opacity: 0}),
        animate('0.3s' + ' ease-out')
      ])
    ]),
    cardStackFn('user'),
  ]
})
export class UsersComponent implements OnInit, OnDestroy {
  // userCardAction;
  @Input() users: IUserAnalytics[];
  @Input() selectedUserId: string | null;
  @Input() selectedUserDataId: string | null;
  @Input() loadingUserDataId: string | null;
  @Input() hasMap: boolean = false;
  @Input() showExtraBtn: boolean = true;
  @Output() onSelectUser: EventEmitter<string | null> = new EventEmitter();
  @Output() onAction: EventEmitter<string | null> = new EventEmitter();
  @Output() onHover: EventEmitter<string | null> = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }



  getAction(user) {
    // console.log("action", this.loadingUserDataId, this.loadingUserId);
    const id = user.id;
    if (!this.hasMap) return 'detail';

    if (this.selectedUserId === user.id) {
      return "close"
    } else if (id === this.loadingUserDataId && (!this.selectedUserId || !user.segments) ) {
      return 'loading'
    } else if (this.selectedUserDataId === user.id) {
      return 'detail';
    }  else {
      return "default"
    }
  }

  indexId(index, item) {
    return item.id
  }

  selectUser(user) {
    this.onSelectUser.next(user)
  }

  hover(id: string | null) {
    this.onHover.next(id)
  }

  ngOnDestroy() {

  }

}
