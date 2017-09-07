import { Component, OnInit } from '@angular/core';
import {HtMapService, HtUsersClientService} from "ht-angular-client";
import {IUserData} from "ht-models";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ht-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.less']
})
export class UsersContainerComponent implements OnInit {
  users$;
  user$;
  constructor(
    private userService: HtUsersClientService,
    private mapService: HtMapService
  ) { }

  ngOnInit() {
    this.users$ = this.userService.analytics.getListener();
    this.user$ = this.userService.placeline.getListener();
    // console.log(this.users$);
    this.users$.subscribe((usersPage) => {
      // console.log(usersPage, "data");
    })


  }


  selectUser(user) {
    // console.log("user", user.id);
    const id = user.id;
    // this.id.e.next(id)
    this.userService.analytics.setId(user.id);
    this.userService.placeline.setId(id);
    // this.id$.next(id)
    // this.userService.placeline.idObservable.e.next(user.id)
    // this.id.next(user.id)
    // this.userService.analytics.setId(user.id)

    // this.filteredUser
    // this.user$.do((userData: IUserData) => {
    //   console.log(userData);
    //   this.mapService.tracePlaceline(userData);
    //   this.mapService.resetBounds()
    // })

  };

  selectUserData(userData: IUserData) {
    const id = userData.id;
    // this.id.e.next(id)
    this.userService.placeline.setId(id);
  }

}
