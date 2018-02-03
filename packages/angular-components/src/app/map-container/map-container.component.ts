import {AfterContentInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IUserData} from "ht-models";
import {Observable} from "rxjs/Observable";
import {HtUsersService} from "../ht/ht-users.service";
import {HtMapService} from "../ht/ht-map.service";
import {range} from "rxjs/observable/range";
// import {combineLatest} from "rxjs/operators/combineLatest";
import {startWith, map, distinctUntilChanged} from "rxjs/operators";
import { combineLatest } from 'rxjs/observable/combineLatest';
import { merge } from 'rxjs/observable/merge';
import {User} from "./popermixin";

@Component({
  selector: 'ht-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.less']
})
export class MapContainerComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() showLoading: boolean = true;
  subs = [];
  loading$;
  constructor(
    private userClientService: HtUsersService,
    private mapService: HtMapService
  ) { }

  ngOnInit() {
    this.mapService.usersCluster.setPageData$(this.userClientService.listAll.data$, {
      hide$: this.userClientService.placeline.id$
    });

    // this.mapService.placeline.userMarker = new User(this.mapService.mapInstance);
    // this.mapService.placeline.userMarker.setTimeAwareAnimation(this.mapService.placeline.anim);
    this.mapService.placeline.setCompoundData$(this.userClientService.placeline.data$, {
      roots: ['segments', 'actions'],
      highlighted$: this.userClientService.placeline.segmentSelectedId$,
      filter$: this.userClientService.placeline.segmentResetId$,
      resetMap$: this.userClientService.placeline.segmentResetId$
    });

    const loading$1 = this.userClientService.placeline.loading$
      .pipe(
        map((data) => !!data && this.showLoading),
        distinctUntilChanged()
      );

    const loading$2 = this.userClientService.listAll.loading$
      .pipe(
        map((data) => !!data),
        distinctUntilChanged()
      );

    this.loading$ = merge(loading$1, loading$2);

  }

  ngAfterContentInit() {

  }

  ngOnDestroy() {
    this.userClientService.listAll.clearData();
    this.mapService.usersCluster.trace([])
  }

}
