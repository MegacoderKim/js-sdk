import { Component, OnInit } from '@angular/core';
import {HtUsersService} from "ht-angular";
import {actionsClientFactory, usersClientFactory, dateRangeFactory} from "ht-client";
import {DateRangeMap} from "ht-data";
import {ActionsHeatmapTrace} from "ht-maps";
import {HtMapService} from "ht-angular";
import {HtActionsService} from "ht-angular"

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
    private mapService: HtMapService,
    private actionsClient: HtActionsService
  ) { }

  ngOnInit() {
    if (this.showAll) this.userService.setShowAll();
    // let client = this.actionsClient.listAll;
    // client.setActive();
    // client.data$.subscribe(data => {
    //   console.log(data, "all");
    // });
    // this.mapService.actionsCluster.setPageData$(client.data$)
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

