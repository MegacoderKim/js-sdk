import { Component, OnInit } from '@angular/core';
import {HtUsersService} from "../ht/ht-users.service";
import {actionsClientFactory, dateRangeFactory} from "ht-client";
import {DateRangeMap} from "ht-data";
import { actionClustersTrace } from "ht-maps"

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
  ) { }

  ngOnInit() {
    if (this.showAll) this.userService.setShowAll();
    // let actionCluster = actionClustersTrace();
    // let dateRangeService$ = dateRangeFactory(DateRangeMap.last_30_days);
    // const client  = actionsClientFactory({dateRange$: dateRangeService$.data$.asObservable()});
    // const list = client.list;
    // list.updateStrategy = 'once';
    // list.setActive(true);
    // actionCluster.setData$(list.dataArray$)

  }


}

