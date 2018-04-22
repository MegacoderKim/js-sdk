import {AfterContentInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IUserPlaceline} from "ht-models";
import {Observable} from "rxjs/Observable";
import {HtUsersService} from "../ht/ht-users.service";
import {HtMapService} from "../ht/ht-map.service";
import {range} from "rxjs/observable/range";
// import {combineLatest} from "rxjs/operators/combineLatest";
import {startWith, map, distinctUntilChanged} from "rxjs/operators";
import { combineLatest } from 'rxjs/observable/combineLatest';
import { merge } from 'rxjs/observable/merge';
// import {User} from "./popermixin";

@Component({
  selector: 'ht-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit {
  @Input() hasMap: boolean = false;
  @Input() view: string | null = null;
  @Input()
  set showMapOnly(value: boolean) {
    if (value) this.view = 'map';
  };
  @Input() sidebarWidth: number = 400;
  constructor(
  ) { }

  ngOnInit() {
  }

}
