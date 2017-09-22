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

    this.loading$ = this.userClientService.placeline.loading$
      .map((data) => !!data && this.showLoading)
      .distinctUntilChanged();

  }


  resetMap() {
    this.mapService.resetBounds()
  }

  ngAfterContentInit() {

  }

}
