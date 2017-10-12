import {Component, Input, OnInit} from '@angular/core';
import {HtMapService, HtUsersClientService} from "ht-angular-client";
import {IUserAnalytics, IUserData} from "ht-models";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import * as _ from "underscore";
// import {htUser} from "ht-js-data";
import {ApiType} from "ht-js-client";

@Component({
  selector: 'ht-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.less']
})
export class UsersContainerComponent implements OnInit {
  @Input() hasPlaceline = true;
  usersPage$;
  users$;
  user$;
  selectedUserId$;
  selectedUserDataId$;
  loadingUserId$;
  loadingUserDataId$;
  loadingUsers$;
  @Input() hasMap: boolean = false;
  @Input() apiType: ApiType = ApiType.analytics;

  constructor(
    private userService: HtUsersClientService,
    private mapService: HtMapService
  ) { }

  ngOnInit() {
    this.userService.list.setApiType(this.apiType);
    this.userService.list.setActive();
    if (this.hasPlaceline) {
      // this.user$ = Observable.empty();
      this.user$ = this.userService.placeline.data$;
      // this.users$ = this.userService.placelineOrList$();
      this.usersPage$ = this.userService.listPage$();
      this.mapService.usersCluster.onClick = (data, marker) => {
        this.selectUserCard(data)
      }
    } else {
      this.usersPage$ = this.userService.list.data$;
      // this.users$ = this.userService.list.dataArray$;
    }
    this.users$ = this.usersPage$.map((pageData) => {
      return pageData ? pageData.results : pageData
    });

    this.loadingUsers$ = this.userService.list.loading$;

    this.loadingUserDataId$ = this.userService.placeline.loading$.distinctUntilChanged();
    // this.loadingUserId$ = this.userService.list.loading$.distinctUntilChanged();


    this.selectedUserDataId$ = this.userService.placeline.id$;
    this.selectedUserId$ = this.userService.list.id$;
  }

  clear() {
    this.mapService.segmentTrace.trace(null, this.mapService.map)
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
    this.userService.list.updateQuery({page: number})
  }

}
