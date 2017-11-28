import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IUserAnalytics, IUserData, Page} from "ht-models";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import * as _ from "underscore";
import {ApiType, QueryLabel} from "ht-client";
import {listwithSelectedId$, listWithItem$} from "ht-data";
import {HtMapService} from "../ht/ht-map.service";
import {HtUsersService} from "../ht/ht-users.service";
import {Color} from "ht-utility";
import {distinctUntilChanged, map} from "rxjs/operators";

@Component({
  selector: 'ht-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.less']
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
  @Input() hasMap: boolean = false;
  @Input() showStatusSummary: boolean = true;
  @Input() showActiveSummary: boolean = true;
  @Input() apiType: ApiType = ApiType.analytics;
  queryMap: QueryLabel[] = [
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

    this.loadingUsers$ = this.userService.list.loading$
      .pipe(
        map(data => !!data),
        distinctUntilChanged()
      );

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
    )
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

  selectUserData(userData: IUserData, event) {
    const id = userData.id;
    event.stopPropagation();
    this.userService.placeline.toggleId(id);
  }

  fetchPage(number) {
    this.userService.list.setQuery({page: number})
  }

  hoverUser(userId: string | null) {
    this.mapService.usersCluster.setPopup(userId)
  }

  closeHoverUser() {
    this.hoverUser(null)
  }

  ngOnDestroy() {

  }

}
