import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import {UserService} from "../users/user.service";
import {UserTraceService} from "../users/user-trace.service";
import {HtMapService, HtUsersService} from "ht-angular";
import {ContainerService} from "../container/container.service";

@Component({
  selector: 'app-users-map',
  templateUrl: './users-map.component.html',
  styleUrls: ['./users-map.component.scss']
})
export class UsersMapComponent implements OnInit {
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
    })

  }

  closeUser() {
    this.htUsersService.placeline.setId(null);
    this.htUsersService.list.setId(null);
    this.mapService.resetBounds();
  }

}
