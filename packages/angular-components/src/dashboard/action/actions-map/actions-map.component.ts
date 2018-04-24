import { Component, OnInit } from '@angular/core';
import {HtActionsService, HtUsersService} from "ht-angular";
import {config} from "../../config";
import {ContainerService} from "../../container/container.service";
import {UserTraceService} from "../../users/user-trace.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-actions-map',
  templateUrl: './actions-map.component.html',
  styleUrls: ['./actions-map.component.scss']
})
export class ActionsMapComponent implements OnInit {
  loading$;
  query$;
  data$;
  baseUrl = config.isWidget ? '/widget' : '/';
  isMobile = config.isMobile;
  client;
  selectedActionId$;
  showReplay$;
  constructor(
    private containerService: ContainerService,
    private usersService: HtUsersService,
    public userTraceService: UserTraceService,
    private actionsService: HtActionsService
  ) { }

  ngOnInit() {
    this.containerService.setEntity('actions');
    this.containerService.setView('map');

    this.selectedActionId$ = this.usersService.placeline.actionId$;

    this.client = this.actionsService.list;
    this.loading$ = this.actionsService.list.loading$;
    this.query$ = this.actionsService.list.getApiQuery$();
    this.data$ = this.actionsService.list.data$;
    this.actionsService.list.setActive();
    this.actionsService.listAll.setActive();

    this.showReplay$ = this.userTraceService.segmentsTrace.timelineSegment.getReplayStats().pipe(
      map((stats) => {
        return stats && stats.timeAwarePolylineArray && stats.timeAwarePolylineArray.length > 1
      })
    );
  }


  selectAction(action) {
    this.usersService.placeline.setQuery({action_id: action.id})
  }

  closeUser() {
    this.usersService.placeline.setQuery({})
  }

}
