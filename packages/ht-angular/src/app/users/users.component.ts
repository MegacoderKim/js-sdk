import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUserAnalytics, IUserAnalyticsPage} from "ht-models";
// import {entryLeaveTransition} from "../../animations/appear";
// import {anim} from "../../animations/appear";
import {animate, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'ht-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
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
    trigger('image', [
      // transition(':enter', [
      //   query(':self', [
      //     style({ transform: 'translateX(-200px)', opacity: 0, height: 0 }),
      //     stagger(100, [
      //       animate('1200ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
      //     ])
      //   ])
      // ]),
      // transition(':leave', [
      //   query(':self', [
      //
      //     stagger(100, [
      //       animate('1200ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateX(-200px)', opacity: 0, height: 0 }))
      //     ])
      //   ])
      // ]),
    ]
    ),
    trigger('sort', [
      transition('* => *',
        animate(500, keyframes([
          style('*'),
          style({ opacity: 0.1}),
          style('*'),
        ]))
      ),
      // transition(':decrement',
      //   animate(500, keyframes([
      //     style('*'),
      //     style({ opacity: 0.1, transform: 'translateX(-50px)'}),
      //     style('*'),
      //   ]))
      // ),
    ]),
    trigger('cardStack', [
      transition('* => *', [
        query('.card:enter', [
          style({transform: 'translateX(-100px)', height: 0, opacity: 0}),
          animate('0.3s' + ' ease-out')
        ], {optional: true}),
        query('.card:leave', [
          style({transform: 'translateX(0px)', height: '*', opacity: 1}),
          animate('0.3s' + ' ease-in', style({transform: 'translateX(-100px)', height: 0, opacity: 0}))
        ], {optional: true})
      ])
    ])
  ]
})
export class UsersComponent implements OnInit {
  userCardAction;
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

}
// export function entryLeaveTransition(name: string, entryStyle: {[key: string]: string | number}, duration: string = '0.4s') {
//   return trigger(name, [
//     transition(':enter', [
//       style(entryStyle),
//       animate(duration + ' ease-out')
//     ]),
//     transition(':leave', [
//       animate(duration + ' ease-in', style(entryStyle))
//     ])
//   ]);
// }
