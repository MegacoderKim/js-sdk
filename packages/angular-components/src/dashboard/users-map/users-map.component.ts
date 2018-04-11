import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import {UserService} from "../users/user.service";
import {UserTraceService} from "../users/user-trace.service";
import {HtMapService, HtUsersService} from "ht-angular";
import {ContainerService} from "../container/container.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import * as fromRoot from "../reducers";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs/Subscription";
import * as fromUser from "../actions/user";

@Component({
  selector: 'app-users-map',
  templateUrl: './users-map.component.html',
  styleUrls: ['./users-map.component.scss'],
  animations: [
    trigger('filter', [
      // state('hide', style({
      //   display: 'none'
      // })),
      transition(':enter', [
        style({transform: 'translateY(-300px)', opacity: 1}),
        animate('0.3s' + ' ease-out')
      ]),
      transition(':leave', [
        animate('0.3s' + ' ease-in', style({transform: 'translateY(-300px)', opacity: 1}))
      ])])
  ]
})
export class UsersMapComponent implements OnInit, OnDestroy {
  userId: string | null = null;
  query: object;
  showReplay$;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public userTraceService: UserTraceService,
    public htUsersService: HtUsersService,
    private mapService: HtMapService,
    private containerService: ContainerService
  ) { }
  selectUser() {

  }
  ngOnInit() {
    this.containerService.setEntity('users');
    this.containerService.setView('list');
    this.showReplay$ = this.userTraceService.segmentsTrace.timelineSegment.getReplayStats()
      .map((stats) => {
        return stats && stats.timeAwarePolylineArray && stats.timeAwarePolylineArray.length > 1
      });
    this.userId = this.route.snapshot.params['id'];
    this.query = this.userService.getQueryFromRoute(this.route.snapshot.params);

    this.userService.getQueryForRoute().subscribe((query) => {
      this.router.navigate([query], {relativeTo: this.route})
    });

  }

  closeUser() {
    this.htUsersService.placeline.setId(null);
    this.htUsersService.list.setId(null);
    this.mapService.resetBounds();
  }

  ngOnDestroy() {
    // if (this.sub) this.sub.unsubscribe();
  }

}
