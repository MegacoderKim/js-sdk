import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import {IUserAnalytics, IAction, Page, IUserPlaceline} from "ht-models";
// import {entryLeaveTransition} from "../../animations/appear";
// import {anim} from "../../animations/appear";
import {animate, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";
import {Observable} from "rxjs/Observable";
import {cardStackFn, shuffle} from "../../common/animations";

@Component({
  selector: 'ht-users-cards-container',
  templateUrl: './users-cards-container.component.html',
  styleUrls: ['./users-cards-container.component.less'],
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
export class UsersCardsContainerComponent implements OnInit, OnDestroy, OnChanges {
  // userCardAction;
  @Input() usersPage: Page<IUserAnalytics>;
  @Input() userPlaceline: IUserPlaceline;
  @Input() selectedUserId: string | null;
  @Input() selectedUserDataId: string | null;
  @Input() loadingUserDataId: string | null;
  @Input() hasMap: boolean = false;
  @Input() showExtraBtn: boolean = true;
  @Output() onSelectUser: EventEmitter<string | null> = new EventEmitter();
  @Output() onAction: EventEmitter<string | null> = new EventEmitter();
  @Output() onHover: EventEmitter<string | null> = new EventEmitter();
  displayUsers: IUserAnalytics[] | IUserPlaceline[];
  actions: IAction[];
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes) {
    if (this.userPlaceline) {
      this.displayUsers = [this.userPlaceline]
    } else if (this.usersPage) {
      if (this.userPlaceline || this.selectedUserId) {
        this.displayUsers = this.usersPage.results.reduce((users, user) => {
          return user.id == this.selectedUserId ?
            this.userPlaceline ?
              [this.userPlaceline] : [user] : users
        }, [])
      } else {
        this.displayUsers = this.usersPage.results;
      }
      if (changes.userPlaceline || changes.usersPage) {
        // const usersPlaceline = changes.userPlaceline
        if (this.userPlaceline) {
          this.actions = this.userPlaceline.actions
        } else {
          this.actions = []
        }
      }
    }
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
