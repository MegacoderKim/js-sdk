import {Component, ElementRef, OnInit, QueryList, ViewChildren} from "@angular/core";
import {UserService} from "../user.service";
import {IPlaceHeatPage, IUser, IUserAnalytics, IUserAnalyticsPage, IUserListSummary} from "ht-models";
import * as fromRoot from "../../reducers";
import * as fromUser from "../../actions/user";
import * as fromUi from "../../actions/ui";
import * as fromQuery from "../../actions/query";
import {Store} from "@ngrx/store";
import {BroadcastService} from "../../core/broadcast.service";
import * as _ from "underscore";
import {ActivatedRoute} from "@angular/router";
import {IRange} from "../../model/common";
import {ContainerService} from "../../container/container.service";
import {GetUserMarkerFilter, GetUserMarkerSeached} from "../../../utils/users";
import {scaleOrdinal} from "d3-scale";
import {schemeSet2} from "d3-scale-chromatic";
import {Color} from "../../../utils/color";
import {ActiveUserComponent} from "./active-user/active-user.component";
import {IsRangeToday} from "../../../utils/time-utils";
import {Observable} from "rxjs/Observable";
import {anim} from "../../../utils/animations";
import {UsersListComponent} from "../../container/users-list/users-list.component";
import {FitToMapService} from "../../container/user-filter/fit-to-map.service";
import {InnerMapService} from "../../map-container/map.service";
import {htUser} from "ht-data";
import {config} from "../../config";

@Component({
  selector: 'app-live-users',
  templateUrl: './live-users.component.html',
  styleUrls: ['./live-users.component.less'],
  animations: [
    anim.popup,
      anim.appear,
    anim.appearIn
  ]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveUsersComponent extends UsersListComponent implements OnInit {
  selectedUserId: string | null;
  selectedUserSegmentId: string | null;
  overview;
  mapRefreshTimestamp: string;
  summaryEntities = [
    {
      keys: [
          'stopped'
      ],
      name: 'Stopped',
      value: 0,
      query: {status: 'stopped'}
    },
    {
      keys: [
          'on_trip'
      ],
      name: 'Moving',
      value: 0,
      query: {status: 'moving'}
    },
    {
      keys: [
        'location_disabled',
      ],
      name: 'Location disabled',
      value: 0,
    },
    {
      keys: [
        'network_offline'
      ],
      name: 'Network offline',
      value: 0,
    },
    {
      keys: [
          'logged_off'
      ],
      name: 'Tracking stopped',
      value: 0
    },
  ];
  neverTrackedSummary = {
    keys: [
      'never_tracked'
    ],
    name: 'Never tracked',
    value: 0
  };
  isToday: boolean;
  isSingleDay: boolean;
  totalUsers: number;
  mapDataReady: boolean = false;
  @ViewChildren(ActiveUserComponent, { read: ElementRef }) userCard: QueryList<ActiveUserComponent>;
  constructor(
      public userService: UserService,
      public store: Store<fromRoot.State>,
      public broadcast: BroadcastService,
      public route: ActivatedRoute,
      public containerService: ContainerService,
      public fitToMapService: FitToMapService,
      private mapService: InnerMapService
  ) {
    super(route, broadcast, store, userService);
    this.getData();
  }

  ngOnInit() {
    this.containerService.setEntity('users');
    super.ngOnInit();
    this.fillData();
    this.initFitToMap();
    let sub = this.broadcast.on('close-heatmap').subscribe(() => {
      this.closeUserCard()
    });
    this.subs.push(sub)
  }

  initFitToMap() {
    let showAll = this.route.snapshot.queryParams['show_all'];
    showAll = showAll == true || showAll === 'true';
    if(!config.isMobile && !showAll) {
      this.fitToMapService.init();
    }
  }

  getSummaryApi(query) {
    let queryWithoutStatus = {...query, status: null};
    return super.getSummaryApi(queryWithoutStatus)
    // return this.userService.summary(query)
  }

  selectUser(select: boolean, user: IUser) {
    if(select) {
      this.openUserCard(user)
      // this.selectedUser$.next(user)
    } else {
      this.closeUserCard();

    }

  }

  private openUserCard(user: IUser | {id: string}) {
    this.broadcast.emit('hover-user', null);
    this.store.dispatch(new fromUser.SetUsersMapFilterAction((userMap: IUserAnalytics) => false));
    // if(!this.isSingleDay) this.store.dispatch(new fromUser.SetFilterUserPlace((userMap: IUserAnalytics) => true));
    this.selectedUserId = user.id;
    this.store.dispatch(new fromUser.ClearUserAction());
    // this.store.dispatch(new fromUser.SetFilterUserPlace(() => false));
    this.store.dispatch(new fromUser.SelectUserIdPlaceAction(user.id));
    // this.store.dispatch(new fromUi.LoadingMapUiAction(true));
    this.mapService.preserveBounds()
  }

  private closeUserCard() {
    this.selectedUserId = null;
    this.store.dispatch(new fromUser.ClearUserAction());
    this.store.dispatch(new fromUser.ClearSelectedUserPlace());
    // this.selectedUser$.next(null);
    let query = this.route.snapshot.queryParams;
    // this.store.dispatch(new fromUser.SetFilterUserPlace(() => true));
    let userMarkerFilter = query.status ? GetUserMarkerFilter(query.status) : () => true ;
    this.store.dispatch(new fromUser.SetUsersMapFilterAction(userMarkerFilter));
    this.mapService.setPreservedBounds()
  }

  hoverUser(user) {
    if(!config.isMobile) this.broadcast.emit('hover-user', user)
  }

  setStatusFilter(overview: StatusOverview) {
    let query = {status: overview.keys.toString()};
    this.store.dispatch(new fromQuery.UpdateUserListQueryQueryAction(query))
  }

  onListDateQueryChange(query) {
    let status = query.status;
    let search = query.search;
    let ids = query['id'];
    let userMarkerFilters = [];
    // if(status || search) {
    //   this.updateUserMap(query);
    // }
    if(status) {
      // this.updateUserMap(query);
      userMarkerFilters.push(GetUserMarkerFilter(status))
    }
    if(search) {
      userMarkerFilters.push(((user: IUserAnalytics) => {
        return htUser().getMarkerSearched(search)(user) // || userMarkerFilter(user)
      }));
      this.updateUserMap(query);
    }
    if(ids) {
      let userIds = ids.split(',');
      userMarkerFilters.push((user: IUserAnalytics) => {
        return _.contains(userIds, user.id)
      })
    }
    let userMarkerFilter = this.selectedUserId ? (user) => false : (user) => {
      return _.reduce(userMarkerFilters, (acc, filter: (user) => boolean) => {
        return acc && filter(user)
      }, true)
    };
    this.store.dispatch(new fromUser.SetUsersMapFilterAction(userMarkerFilter));
    super.onListDateQueryChange(query)
  }

  ngOnDestroy() {
    this.store.dispatch(new fromUser.ClearUserAction());
    this.store.dispatch(new fromUser.ClearUsersMapAction());
    this.store.dispatch(new fromUser.ClearUserPlace());
    this.store.dispatch(new fromUser.ClearSelectedUserPlace());
    this.fitToMapService.clear();
    this.mapService.clearPreserved();
    super.ngOnDestroy()
  }

  private getData(update: boolean = false) {
    this.store.dispatch(new fromUi.LoadingMapUiAction(true));
    var userAnalyticsCb = (usersMapPage: IUserAnalyticsPage) => {
      if(usersMapPage.previous || update) {
        this.store.dispatch(new fromUser.AddUsersMapAction(usersMapPage.results));
      } else {
        this.store.dispatch(new fromUser.UpdateUsersMapAction(usersMapPage.results))
      }
    };

    var userPlaceCb = (userPlacePage: IPlaceHeatPage) => {
      if(userPlacePage.previous || update) {
        this.store.dispatch(new fromUser.UpdateUserPlace(userPlacePage.results))
      } else {
        this.store.dispatch(new fromUser.SetUserPlace(userPlacePage.results));
      }
    };

    // let mapQuery$ = Observable.combineLatest(
    //   this.getPageQuery(),
    //   this.getDateRange()
    // ).map(([page, date]) => {
    //
    //   return {...page, ...date, isToday: null}
    // });

    let sub = this.getDateRange()
      .switchMap(() => this.getQuery().take(1))
      .switchMap((query: object) => {
      this.isToday = IsRangeToday(query);
      if(this.isToday) {
        this.store.dispatch(new fromUser.ClearUserPlace());
        this.mapRefreshTimestamp = new Date().toISOString();
        return this.userService.getAllUserAnalytics({...query, show_all: null, ordering: '-created_at'}, userAnalyticsCb)
          // .expand((users) => {
          //   // console.log(users, "aal");
          //   // min_last_heartbeat_at: start
          //   return Observable.timer(10000).switchMap(() => {}))
          // })
        // return this.userService.getAllUserAnalytics(query, userAnalyticsCb)
      } else {
        this.store.dispatch(new fromUser.ClearUsersMapAction());
        return this.userService.placeList(query, userPlaceCb)
      }
    }).subscribe(() => {
      this.store.dispatch(new fromUi.LoadingMapUiAction(false));
      this.mapDataReady = true;
    });

    this.subs.push(sub)
  }

  getUserMap() {
    var userAnalyticsCb = (usersMapPage: IUserAnalyticsPage) => {
      if(usersMapPage.previous) {
        this.store.dispatch(new fromUser.AddUsersMapAction(usersMapPage.results));
      } else {
        this.store.dispatch(new fromUser.UpdateUsersMapAction(usersMapPage.results))
      }
      // this.store.dispatch(new fromUser.ClearUserPlace());
    };
  }

  pieColor(index) {
    let d3Color = scaleOrdinal(schemeSet2);
    let userColor = [
        Color.stop,
      Color.blue,
      Color.red,
      '#cc8f6f',
        '#8a91a0',
      '#ccc'
    ];
    if(index < 6) {
      return userColor[index]
    } else {
      return d3Color(index)
    }
  }


  onQueryChange(query) {
    this.store.select(fromRoot.getUserData).take(1).subscribe((userData) => {
      if(userData) this.closeUserCard();
    });
    super.onQueryChange(query)
  }

  private updateUserMap(query) {
    let userPlace$ = (query) => this.store.select(fromRoot.getQueryDateRange)
        .take(1)
        .switchMap((range: IRange) => {
          if(range.isToday) {
            return this.userService.getAllUserAnalytics({...query, start: range.start, end: range.end})
          } else {
            return Observable.of(null)
          }
        }).filter((data) => !!data);

    let sub = userPlace$(query).subscribe((usersMaps: IUserAnalytics[]) => {
      // let usersMap = _.filter(usersMapa, (userMap: IUserAnalytics) => {
      //   return !!(userMap.last_location && userMap.last_location.geojson)
      // });
      this.store.dispatch(new fromUser.AddFilterUsersMapAction(usersMaps));
    });

    this.subs.push(sub)
  }

  selectDetailedUser(id) {
    // this.store.dispatch(new fromUser.SetFilterUserPlace(() => false));
    this.selectedUserId = id;
    this.store.dispatch(new fromUser.SetUsersMapFilterAction(() => false));
    this.broadcast.emit('scroll-top')
  }

  unselectDetailedUser(id) {
    if(this.selectedUserId && !this.isSingleDay && !config.isMobile) this.openUserCard({id: this.selectedUserId});
    if(config.isMobile) this.closeUserCard();
    if(this.selectedUserId) this.scrollSelected(this.selectedUserId)
  }

  private fillData() {
    //fill data and su to be displayed
    let sub1 = this.store.select(fromRoot.getUserPageData).subscribe(data => {
      this.items = data;
      // if(data && this.isToday) this.store.dispatch(new fromUser.AddUsersMapAction(data.results))
    });

    let sub2 = this.store.select(fromRoot.getUserSummary).filter(data => !!data).subscribe((data: IUserListSummary) => {
      this.summary = data;
      let total = 0;
      let statusTotal;
      let summaryEntity = this.showAll ? [...this.summaryEntities, this.neverTrackedSummary] : this.summaryEntities;
      this.overview = _.map(summaryEntity, (entity) => {
        let sum = _.reduce(entity.keys, (acc, key: string) => {
          return acc + data.status_overview[key]
        }, 0);
        let value = entity.value + sum;
        total = total + value;
        let selected = false;
        if(this.status) {
          if(this.status == entity.keys[0]) statusTotal = value;
          let status = this.status.split(',');
          selected = _.reduce(entity.keys, (acc, key) => {
            return acc && status.indexOf(key) > -1
          }, true)
        };
        return {...entity, value, selected }
      });
      this.totalUsers = total;
      if(!this.currentTotal) this.currentTotal = total;
      this.updateMap(statusTotal || total, !!this.status)
    });

    this.subs.push(sub1, sub2)
  }

  private updateMap(totalUsers, hasStatus: boolean = false) {
    let toUpdate$ = this.store.select(fromRoot.getUserMapList).take(1).map((obj) => {
      let currentTotal = obj.validUsers.length + obj.invalidUsers.length;
      let toUpdate = currentTotal != totalUsers && !!currentTotal && !!totalUsers && this.isToday && this.mapDataReady;
      return toUpdate
    }).filter((toUpdate) => toUpdate);

    let cb = (usersMapPage) => {
      this.store.dispatch(new fromUser.AddUsersMapAction(usersMapPage.results))
    };
    let updateQuery = hasStatus ? {} : {min_last_heartbeat_at: this.mapRefreshTimestamp};
    let api$ = (query) => this.userService.getAllUserAnalytics({...query, show_all: null, ordering: '-created_at', ...updateQuery}, cb);
    let range$ = toUpdate$.withLatestFrom(this.getListDateQuery()).map(([toUpdate, range]) => range);
    let update$ = range$.switchMap((range) => api$(range));
    let time = new Date().toISOString();
    let sub = update$.subscribe(() => {
      if(!hasStatus) this.mapRefreshTimestamp = time
      //map updated
    });
    this.subs.push(sub)
  }

  private scrollSelected(id: string) {
    if(!this.userCard) return false;
    let selectedCard = this.userCard.find((item: any) => {
      if(item.nativeElement && item.nativeElement.id == id) {
        setTimeout(() => {
          if(item.nativeElement) item.nativeElement.scrollIntoView()
        },100)
      }
      return item.nativeElement.id == id
    });
    if(!selectedCard) {
      this.selectedUserId = null;
      this.store.dispatch(new fromUser.ClearUserAction());
      // this.selectedUser$.next(null);
      let query = this.route.snapshot.queryParams;
      let userMarkerFilter = query.status ? GetUserMarkerFilter(query.status) : () => true ;
      this.store.dispatch(new fromUser.SetUsersMapFilterAction(userMarkerFilter));
      //clear selected map
    }
  }

  refreshList() {
    this.getPageQuery().take(1).subscribe((query) => {
      this.updatePageQuery(query)
      // this.store.dispatch(new fromQuery.Update(range))
    })
  }
}

interface StatusOverview {
  keys: string[],
  name: string,
  value: number
}

