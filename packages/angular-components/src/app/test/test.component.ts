import { Component, OnInit } from '@angular/core';
import {HtUsersService} from "../ht/ht-users.service";
import {actionsClientFactory, usersClientFactory, dateRangeFactory} from "ht-client";
import {DateRangeMap} from "ht-data";
import {ActionsHeatmapTrace} from "ht-maps";
import {HtMapService} from "../ht/ht-map.service";

@Component({
  selector: 'ht-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {
  showAll: boolean = false;
  userId = "43fbf0db-530b-4f79-9093-6f565ea6d37e";
  constructor(
    private userService: HtUsersService,
    private mapService: HtMapService
  ) { }

  ngOnInit() {
    if (this.showAll) this.userService.setShowAll();
    // let actionCluster = new ActionsHeatmapTrace();
    // let dateRangeService$ = dateRangeFactory(DateRangeMap.today);
    // const client  = usersClientFactory({dateRange$: dateRangeService$.data$.asObservable()});
    // const list = client.list;
    //
    // list.updateStrategy = 'once';
    // list.setActive(true);
    // this.mapService.usersCluster.setData$(list.dataArray$)

  }


}

