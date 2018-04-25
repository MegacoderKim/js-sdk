import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import {IAction, IUserPlaceline} from "ht-models";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {map, switchMap} from "rxjs/operators";
import {HtUsersService} from "../../ht/ht-users.service";
import {bottomAppear} from "../../common/animations";

@Component({
  selector: 'ht-actions-placeline-container',
  templateUrl: './actions-placeline-container.component.html',
  styleUrls: ['./actions-placeline-container.component.scss'],
  animations: [
    bottomAppear
  ]
})
export class ActionsPlacelineContainerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() actionId;
  @Input() userPlaceline: IUserPlaceline;
  @Input() loading;
  action$: Observable<IAction | null>;
  action: IAction;
  data$;
  loading$;
  selectedSegmentId$;
  constructor(
    private usersService: HtUsersService
  ) { }

  ngOnInit() {
    this.data$ = this.usersService.placeline.data$;
    this.loading$ = this.usersService.placeline.loading$;

    this.selectedSegmentId$ = this.usersService.placeline.segmentResetId$;
    this.action$ = this.usersService.placeline.actionId$.pipe(
      switchMap((id) => {
        return id ? this.usersService.placeline.data$.pipe(
          map((userPlaceline: IUserPlaceline) => {
            return userPlaceline ?
              userPlaceline.actions.find((action) => action.id == id) : null
          })
        ) : of(null)
      }),

    )
  };

  ngOnChanges(changes) {
    // if (changes.userPlaceline) {
    //   this.action = this.userPlaceline.actions.find((action) => action.id == this.actionId)
    // }
  }

  onHighlightSegment(segmentId: string) {
    this.usersService.placeline.setSegmentSelectedId(segmentId);
  }

  onSelectSegmentId(segmentId: string | null) {
    this.usersService.placeline.setSegmentResetMapId(segmentId);
  }

  ngOnDestroy() {
    this.usersService.placeline.clearData()
  }

}
