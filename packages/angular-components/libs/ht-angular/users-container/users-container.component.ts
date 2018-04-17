import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IUserAnalytics, IUserPlaceline, Page} from "ht-models";
import {Observable} from "rxjs/Observable";
import {ApiType, QueryLabel} from "ht-client";
import {listwithSelectedId$, listWithItem$, CombineLoadings$} from "ht-data";
import {HtMapService} from "../ht/ht-map.service";
import {HtUsersService} from "../ht/ht-users.service";
import {Color, IsRangeToday} from "ht-utility";
import {distinctUntilChanged, map} from "rxjs/operators";
import {merge} from "rxjs/observable/merge";
import {animate, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'ht-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.less'],
  animations: [
    trigger('appear', [
        transition(':enter', [
          style({transform: 'translateY(400px)', opacity: 0}),
          animate('0.3s' + ' ease-out')
        ]),
        transition(':leave', [
          style({transform: 'translateY(0px)', opacity: 1}),
          animate('0.3s' + ' ease-in', style({transform: 'translateY(400px)', opacity: 0}))
        ])
      ]
    ),
  ]
})
export class UsersContainerComponent implements OnInit, OnDestroy {
  @Input() hasPlaceline = true;
  usersPage$;
  users$;
  user$;
  selectedUserId$;
  showSummary$;
  selectedUserDataId$;
  loadingUserId$;
  loadingUserDataId$;
  loadingUsers$;
  // todo infer has map from mapInstance
  @Input() hasMap: boolean = false;
  @Input() userId: string;
  @Input() query: object;
  @Input() showStatusSummary: boolean = true;
  @Input() showActiveSummary: boolean = true;
  @Input() apiType: ApiType = ApiType.analytics;
  @Input() showAll: boolean = false;
  _queryMap: QueryLabel[] = [
    {
      label: 'Logged in',
      values: ['stopped', 'on_trip', 'network_offline'],
      color: Color.blue
    },
    {
      label: 'Logged off',
      values: ['logged_off'],
      color: '#a8a8a8',
    },
    {
      label: 'Location disabled',
      values: ['location_disabled'],
      color: Color.red
    },
  ];
  mapLoading$: Observable<boolean>;
  showMapLoading: boolean = false;
  constructor(
    private userService: HtUsersService,
    private mapService: HtMapService
  ) { }

  ngOnInit() {
    this.userService.list.setActive();
    if (this.hasPlaceline) {
      const selectedUser$ = listwithSelectedId$(
        this.userService.list.data$,
        this.userService.list.id$
      );
      this.user$ = this.userService.placeline.data$;
      this.usersPage$ = listWithItem$(
        selectedUser$,
        this.user$
      );
      this.mapService.usersCluster.onClick = (entity) => {
        this.selectUserCard(entity.data);
      };

    } else {
      this.usersPage$ = this.userService.list.data$;
    }

    this.users$ = this.usersPage$.pipe(
      map((pageData: Page<any>) => {
        return pageData ? pageData.results : pageData
      })
    );

    this.loadingUsers$ = this.userService.getLoading$();

    this.loadingUserDataId$ = this.userService.placeline.loading$
      .pipe(
        map(data => !!data),
        distinctUntilChanged()
      );

    this.selectedUserDataId$ = this.userService.placeline.id$;
    this.selectedUserId$ = this.userService.list.id$;

    this.showSummary$ = this.selectedUserId$.pipe(
      map(id => {
        return id ? false : true
      }),
      distinctUntilChanged(),
      // startWith(true)
    );

    if (this.userId){
      this.userService.placeline.setId(this.userId);
      this.userService.list.setId(this.userId || null)
    }
    if (this.query) {
      this.userService.list.setQuery(this.query);
    }
    if (this.hasMap) this.bindMapData()
  };

  bindMapData() {
    this.userService.dateRange.data$.subscribe((range) => {
      const isToday = IsRangeToday(range);
      if (isToday) {
        this.hideHeatmap();
        this.showCluster()
      } else {
        this.hideCluster();
        this.showHeatmap();
      }
    });
    this.userService.listAll.setActive();
    this.mapService.usersCluster.setPageData$(this.userService.listAll.data$, {
      hide$: this.userService.placeline.id$
    });
    this.mapService.usersHeatmap.setPageData$(
      this.userService.heatmap.data$,
      {
        hide$: this.userService.placeline.id$
      }
    );

    // this.mapService.placeline.userMarker = new User(this.mapService.mapInstance);
    // this.mapService.placeline.userMarker.setTimeAwareAnimation(this.mapService.placeline.anim);
    this.mapService.placeline.setCompoundData$(this.userService.placeline.data$, {
      roots: ['placeline', 'actions'],
      highlighted$: this.userService.placeline.segmentSelectedId$,
      filter$: this.userService.placeline.segmentResetId$,
      resetMap$: this.userService.placeline.segmentResetId$
    });

    const loading$1 = this.userService.placeline.loading$
      .pipe(
        map((data) => !!data && this.showMapLoading),
        distinctUntilChanged()
      );

    const loading$2 = this.userService.listAll.loading$
      .pipe(
        map((data) => !!data),
        distinctUntilChanged()
      );

    const loadingHeat$ = this.userService.heatmap.loading$;

    const mapLoading$: Observable<boolean> = CombineLoadings$(loading$1, loading$2, loadingHeat$).pipe(
      map(data => {
        return !!data
      })
    );
    this.mapService.mapInstance.loading$ = mapLoading$
  };

  private showCluster() {
    this.userService.listAll.setActive()
  }

  private hideCluster() {
    this.userService.listAll.clearData();
    this.userService.listAll.setActive(false)
  }

  private showHeatmap() {
    this.userService.heatmap.setActive()
  }

  private hideHeatmap() {
    this.userService.heatmap.clearData()
  }

  get queryMap() {
    const showAllLabel = this.userService.filterClass.showAllQueryArray;
    return this.showAll ? [...this._queryMap, ...showAllLabel] : this._queryMap;
  }

  clear() {
    this.mapService.segmentTrace.trace(null)
  }

  selectUserMarker(user) {
    this.mapService.usersCluster.highlight(user)
  }

  onAction(payload) {
    // console.log(payload, payload['action']);
    switch (payload['action']) {
      case "close":
        this.closeUser(payload.event);
        break;
      case "detail": {
        this.selectUserCard(payload.user);
        // this.selectUserMarker(payload.user);
        // this.selectUser(payload.user);
        break;
      }
      case "default": {
        this.selectUserCardAction(payload.user, payload.event);
        // this.selectUserData(payload.user, payload.event);
        break
      }
      default: {

      }

    }
  };

  selectUserCard(user) {
    if (this.hasPlaceline) {
      this.selectUser(user)
    } else {
      this.selectUserMarker(user)
    }

  }

  selectUserCardAction(user, event) {
    if (this.hasPlaceline) {
      this.selectUserData(user, event);
    } else {
      this.selectUserMarker(user);
    }
  }

  closeUser(event) {
    event.stopPropagation();
    this.userService.list.setId(null);
    this.userService.placeline.setId(null)
  }


  selectUser(user) {
    const id = user.id;
    this.userService.list.toggleId(id);
    this.userService.placeline.toggleId(id);
    // this.userService.placeline.setId(id);

  };

  selectUserData(userData: IUserPlaceline, event) {
    const id = userData.id;
    event.stopPropagation();
    this.userService.placeline.toggleId(id);
  }

  fetchPage(number) {
    this.userService.list.addQuery({page: number})
  }

  hoverUser(userId: string | null) {
    this.mapService.usersCluster.setPopup(userId)
  }

  closeHoverUser() {
    this.hoverUser(null)
  }

  clearMapData() {
    this.userService.listAll.clearData();
    this.mapService.usersCluster.trace([])
  }

  ngOnDestroy() {
    if (this.hasMap) this.clearMapData();
    this.userService.list.clearData();
    this.userService.list.setId(null)
  }

}
