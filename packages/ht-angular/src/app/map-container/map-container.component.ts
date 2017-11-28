import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {IUserData} from "ht-models";
import {Observable} from "rxjs/Observable";
import {HtUsersService} from "../ht/ht-users.service";
import {HtMapService} from "../ht/ht-map.service";
import {range} from "rxjs/observable/range";
// import {combineLatest} from "rxjs/operators/combineLatest";
import {startWith, map, distinctUntilChanged} from "rxjs/operators";
import { combineLatest } from 'rxjs/observable/combineLatest';
import { merge } from 'rxjs/observable/merge';
@Component({
  selector: 'ht-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.less']
})
export class MapContainerComponent implements OnInit, AfterContentInit {
  @Input() showLoading: boolean = true;
  subs = [];
  loading$;
  constructor(
    private userClientService: HtUsersService,
    private mapService: HtMapService
  ) { }

  ngOnInit() {
    this.mapService.usersCluster.setData$(this.userClientService.listAll.dataArray$, {
      hide$: this.userClientService.placeline.id$
    });

    this.mapService.placeline.setCompoundData$(this.userClientService.placeline.data$, {
      roots: ['segments', 'actions'],
      filter$: this.userClientService.placeline.segmentSelectedId$,
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


  resetMap() {
    this.mapService.resetBounds()
  }

  ngAfterContentInit() {

  }

}
