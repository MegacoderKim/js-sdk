import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {ActionService} from "../action.service";
import * as fromRoot from "../../reducers"
import * as fromUser from "../../actions/user"
import {Store} from "@ngrx/store";
import {BroadcastService} from "../../core/broadcast.service";
import {IUserPlaceline, IAction} from "ht-models";
import * as _ from "underscore";
import {TaskCardIcon} from "../../asserts/task-card-marker";
import {TimeString} from "ht-utility";
import {HMString} from "ht-utility";
import {ContainerService} from "../../container/container.service";
import {anim} from "../../../utils/animations";
import {NameCase, propToString} from "ht-utility";
import {config} from "../../config";
import {IActionPage} from "ht-models";
import {InnerMapService} from "../../map-container/map.service";
import {of} from "rxjs/observable/of";
import {timer} from "rxjs/observable/timer";
import {catchError, filter, map, switchMap} from "rxjs/operators";
import {HtUsersService} from "ht-angular";

@Component({
  selector: 'app-action-page',
  templateUrl: './action-page.component.html',
  styleUrls: ['./action-page.component.less'],
  animations: [
      anim.sticky
  ]
})
export class ActionPageComponent implements OnInit {
  @Input() showPop: boolean = false;
  @Input() forceClose: boolean = false;
  @Input() baseLink: string = '../';
  icons = TaskCardIcon;
  loadingPage: boolean = true;
  // actions$: BehaviorSubject<any> = new BehaviorSubject(null);
  // users$: Subject<any> = new Subject();
  users$;
  // actionSub$;
  isOnline: any = false;
  hasDriver: boolean = false;
  fetchFirstAction$;
  subs: Subscription[] = [];
  notFound: boolean = false;
  isMobile = config.isMobile;
  selectedPartialSegmentId$;
  timezone = config.timezone;

  constructor(
      private actionService: ActionService,
      private route: ActivatedRoute,
      private store: Store<fromRoot.State>,
      private broadcast: BroadcastService,
      private router: Router,
      private containerService: ContainerService,
      private mapService: InnerMapService,
      private htUsersService: HtUsersService
  ) { }

  ngOnInit() {
    this.containerService.setDetailView(true);
    if(!this.showPop) this.mapService.showMapSwitch = true;
    this.selectedPartialSegmentId$ = this.htUsersService.placeline.segmentResetId$;

    this.users$ = this.htUsersService.placeline.data$;
    // this.users$ = this.store.select(fromRoot.getUserData);

    let param$ = this.route.params;

    let placelineParams$ = param$.pipe(
      map((param) => {
        return this.getPlacelineParam(param)
      })
    );

    let sub2 = placelineParams$.subscribe((query) => {
      this.htUsersService.placeline.setQuery(query);
        // this.store.dispatch(new fromUser.SelectTimelineQueryAction(query));
      // this.store.dispatch(new fromUser.SelectUserIdAction(userId))
      });

    // placelineParams$.share().take(1).subscribe(({query, userId}) => {
    //   this.store.dispatch(new fromUser.SelectUserIdAction(userId))
    // })
    // this.actionSub$ = this.actions$.asObservable().scan((actions, currentActions) => {
    //   console.log(currentActions, actions, "Test");
    //   if(currentActions && actions) {
    //     return _.map(currentActions, (currentAction) => {
    //       return {...currentAction, user: actions[0].user}
    //     })
    //   } else {
    //     return currentActions
    //   }
    // }, null).do((a) => {
    //   console.log("Actions", a);
    // });

    this.subs.push(sub2)
  };

  ngOnDestroy() {
    this.mapService.showMapSwitch = false;
    this.store.dispatch(new fromUser.ClearPartialSegmentAction())
    this.containerService.setDetailView(false);
    _.each(this.subs, sub => sub.unsubscribe());
    if(!this.showPop || this.forceClose) this.htUsersService.placeline.clearData()
  }

  openLookupIdPage(lookupId) {
    let base = config.isWidget ? '../' : './';
    this.router.navigate([base, {lookup_id: lookupId}], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

  private getPlacelineParam(params) {
    let actionId = params['id'];
    const action_unique_id = params['unique_id'] || params['lookup_id'];
    let collectionId = params['collection_id'];
    return {
      action_id: actionId,
      action_collection_id: collectionId,
      action_unique_id
    }
  }

  // private getPlacelineParams$(params) {
  //   return this.getUserId$(params)
  //     .map((userId) => {
  //       this.store.dispatch(new fromUser.SelectUserIdAction(userId))
  //       let timelineQuery = {};
  //       let actionId = params['id'];
  //       let lookupId = params['lookup_id'];
  //       let collectionId = params['collection_id'];
  //       let ids = params['ids'];
  //       if(actionId) timelineQuery['action_id'] = actionId;
  //       if(lookupId) timelineQuery['action_lookup_id'] = lookupId;
  //       if(collectionId) timelineQuery['action_collection_id'] = collectionId;
  //       if(ids) timelineQuery['ids'] = ids;
  //       return {
  //         query: {
  //           action_id: actionId,
  //           action_lookup_id: lookupId,
  //           action_collection_id: collectionId
  //         },
  //         userId
  //       }
  //     })
  // }

  // private getUserId$(params) {
  //   let action$ = this.actionService.index(params);
  //
  //   return this.users$.take(1)
  //     .switchMap((userData: IUserPlaceline | null) => {
  //       if(userData) {
  //         return of(userData.id)
  //       } else {
  //         return timer(0, 20000).pipe(
  //           switchMap(() => action$.pipe(
  //             catchError(err => of({results: []}))
  //           )),
  //           map((actions: IActionPage) => {
  //             if(actions.results.length) {
  //               return actions.results[0].user ? actions.results[0].user.id : null
  //             } else {
  //               this.notFound = true;
  //               this.loadingPage = false;
  //               return null
  //             }
  //           }),
  //           filter((data) => !!data)
  //         )
  //
  //       }
  //     })
  // }

  private fetchFirstAction(params) {
    let action$ = this.actionService.index(params);
    // let actionDriver$ = this.actions$.share().map((actionPage) => {
    //   if(actionPage && actionPage.length && actionPage[0].user) {
    //     return actionPage[0].user.id
    //   } else if(actionPage && actionPage.length){
    //     return actionPage[0].user_id
    //   } else {
    //     return null
    //   }
    // }).filter(data => !!data).take(1);

    // let userId$ =
    //     .takeUntil(this.users$.filter(data => !!data && !!data.id))
      // .switchMap((userId: string) => {
      //   return this.store.dispatch()
      // })
      //   .subscribe((userData: IUserPlaceline) => {
      //     // this.actions$.next(actionPage.results);
      //     // this.user = (actionPage.results && actionPage.results.length > 0) ? actionPage.results[0].user : null;
      //     // this.notFound = !this.user;
      //     this.store.dispatch(new fromUser.SelectUserDataAction(userData));
      //     // this.loadingPage = false;
      //   });

    // let sub2 = userId$.subscribe((userId: string) => {
    //   let timelineQuery = {};
    //   let actionId = params['id'];
    //   let lookupId = params['lookup_id'];
    //   let collectionId = params['collection_id'];
    //   let ids = params['ids'];
    //   if(actionId) timelineQuery['action_id'] = actionId;
    //   if(lookupId) timelineQuery['action_lookup_id'] = lookupId;
    //   if(collectionId) timelineQuery['action_collection_id'] = collectionId;
    //   if(ids) timelineQuery['ids'] = ids;
    //   this.store.dispatch(new fromUser.SelectTimelineQueryAction({
    //     action_id: actionId,
    //     action_lookup_id: lookupId,
    //     action_collection_id: collectionId
    //   }));
    //   // console.log(userId, "userId");
    //   this.store.dispatch(new fromUser.SelectUserIdAction(userId))
    // });
    //
    // this.subs.push(sub2)
  }

  handleTimelineMouseOver(id) {
    this.htUsersService.placeline.setSegmentSelectedId(id);
  }

  selectSegment(id) {
    this.htUsersService.placeline.setSegmentResetMapId(id);
  }

  selectAction(actionId: string) {
    if(actionId) {
      this.store.dispatch(new fromUser.SelectUserActionId(actionId))

    } else {
      this.store.dispatch(new fromUser.ClearUserActionId())
    }
  }

  getActionType(actionType) {
    return NameCase(actionType)
  }

  getActionTypesHeader(actions) {
    let actionTypes = {};
    actions.forEach((action) => {
      let rawActionType = this.getRawActionType(action);
      let currentValue = actionTypes[rawActionType] ? actionTypes[rawActionType] : 0;
      actionTypes[rawActionType] = currentValue + 1;
    });
    let actionKeys = _.keys(actionTypes);
    let headerString = [];
    let allValues= _.values(actionTypes);
    let maxValue = _.max(allValues);
    actionKeys.forEach((actionKey) => {
      let value = actionTypes[actionKey];
      if (value === 1) {
        let useValue = maxValue > 1 ? '1' : '';
        headerString.push(`${useValue} ${this.getActionType(actionKey)}`);
      }
      if (value > 1) {
        headerString.push(`${value} ${this.getActionType(actionKey)}`);
      }
    });
    return [headerString.slice(0, -1).join(', '), headerString.slice(-1)[0]].join(headerString.length < 2 ? '' : ' and ');
  }

  getRawActionType(action) {
    return propToString(action.type)
    // switch (action.type) {
    //   case 'task':
    //     return 'task';
    //   case 'pickup':
    //     return 'pickup';
    //   case 'stopover':
    //     return 'stopover';
    //   case 'delivery':
    //     return 'delivery';
    //   case 'visit':
    //     return 'visit';
    //   case 'dropoff':
    //     return 'dropoff';
    //   case 'trip':
    //     return 'trip';
    //   default:
    //     return 'action';
    // }
  }

  getActionStatus(action) {
    let statusText = this.getActionType(action.type);
    let durationToAction = '';
    switch(action.status) {
      case 'completed':
        if (action.completed_at) {
          statusText = `${this.getActionType(action.type)} at ${TimeString(action.completed_at)}`;
        } else {
          statusText = `Completed ${this.getActionType(action.type)}`;
        }
        return statusText;
      case 'suspended':
        if (action.suspended_at) {
          statusText = `${this.getActionType(action.type)} at ${TimeString(action.suspended_at)}`;
        } else {
          statusText = `Suspended ${this.getActionType(action.type)}`;
        }
        return statusText;
      case 'canceled':
        if (action.canceled_at) {
          statusText = `${this.getActionType(action.type)} at ${TimeString(action.canceled_at)}`;
        } else {
          statusText = `Canceled ${this.getActionType(action.type)}`;
        }
        return statusText;
      case 'started':
        durationToAction = action.display.duration_remaining ? HMString(action.display.duration_remaining, 60) : '';
        statusText = `${this.getActionType(action.type)}`;
        statusText+= durationToAction ? ` - ETA ${durationToAction}` : ``;
        return statusText;
      case 'assigned':
        durationToAction = action.display.duration_remaining ? HMString(action.display.duration_remaining, 60) : '';
        statusText = `${this.getActionType(action.type)}`;
        statusText+= durationToAction ? ` - ETA ${durationToAction}` : ``;
        return statusText;
      default:
        return statusText;
    }
  }

  // getActionSubstatus(action) {
  //   let expectedText = action.expected_at ? `Scheduled at ${TimeString(action.expected_at)}` : '';
  //   return (action.display.substatus ? action.display.substatus : expectedText);
  // }

  // getActionAddress(action) {
  //   let address = action.expected_place ? this.createAddressFromPlace(action.expected_place) : '';
  //   if (action.display.show_summary) {
  //     address = action.completed_place ? this.createAddressFromPlace(action.completed_place) : '';
  //   }
  //   return address;
  // }

  // createAddressFromPlace(place) {
  //   let placeName = place.name ? `${place.name}` : '';
  //   let placeAddress = placeName ? `, ${place.address}` : place.address;
  //   return `${placeName}${placeAddress}`;
  // }

  // showActionStatus(actions, action, index) {
  //   let prevAction = actions[index - 1];
  //   if (prevAction && !prevAction.display.show_summary) return false;
  //   if (action.display.show_summary) return true;
  //   if (!this.showUserStatus(actions)) {
  //     return true;
  //   }
  //   if (this.user) {
  //     return (!this.user.display.is_warning && (this.user.display.status_text !== action.display.status_text));
  //   }
  //   return true;
  // }

  // getActionDisplayStatus(action) {
  //   return action.display.status_text;
  // }

  // getActionIcon(action) {
  //   return this.icons(action.type);
  // }

  showUserStatus(actions) {
    if (!actions || actions.length === 0) return true;
    let pendingActions = actions.filter((action) => {
      return !action.display.show_summary;
    });
    return pendingActions.length > 0;
  }

  isActionDelayed(action: IAction) {
    return action.display.is_late;
  }

  closePopup() {
    _.each(this.subs, sub => sub.unsubscribe());
    let base = config.isWidget ? this.baseLink : './';
    this.router.navigate([base, {}], {relativeTo: this.route, queryParamsHandling: 'preserve'})
  }

  indexId(index, item){
    return item.id
  }

  // onDebug(action) {
  //   if(config.isStaff) {
  //     let url = `/debug/events;action_id=${action.id}`;
  //     var win = window.open(url, '_blank');
  //     if (win) {
  //       //Browser has allowed it to be opened
  //       win.focus();
  //     } else {
  //       //Browser has blocked it
  //       alert('Please allow popups for this website');
  //     }
  //   }
  // }
}
