import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {HtMapService, HtUsersClientService} from "ht-angular-client";
import {IUserData} from "ht-models";
import {ApiType} from "ht-js-client";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ht-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.less']
})
export class MapContainerComponent implements OnInit, AfterContentInit {
  // @Input() userId: string | null;
  @Input() showLoading: boolean = true;
  subs = [];
  loading$;
  constructor(
    private userClientService: HtUsersClientService,
    private mapService: HtMapService
  ) { }

  ngOnInit() {
    this.userClientService.mapClass = this.mapService; // todo handle this from ht-angular-client

    const loading$1 = this.userClientService.placeline.loading$
      .map((data) => !!data && this.showLoading)
      .distinctUntilChanged();

    const loading$2 = this.userClientService.markers.loading$
      .map((data) => !!data)
      .distinctUntilChanged();

    this.loading$ = Observable.merge(loading$1, loading$2);

  }


  resetMap() {
    this.mapService.resetBounds()
  }

  ngAfterContentInit() {

  }

}
