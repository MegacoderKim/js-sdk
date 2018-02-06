import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import { TrackingService } from './tracking.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {MapService} from '../core/map-service';
import { ActionTrace, DestinationMarker } from "ht-maps";
import {filter, take} from 'rxjs/operators';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
  animations: [
    trigger('appear', [
      transition(":enter", [
        style({transform: `translateY(100px)`}),
        animate('300ms ease-out', style({transform: "*"}))
      ])
    ])
  ]
})
export class TrackingComponent implements OnInit, AfterContentInit {
  @Input() shortCode = "ofE2gTfo";
  init: boolean = false;
  actionsData$;
  actionsTrace;
  destination;
  polyline;
  constructor(
    private trackinService: TrackingService,
    private mapService: MapService
  ) {
  }

  ngOnInit() {
    this.trackinService.initShortCode(this.shortCode);
    this.actionsData$ = this.trackinService.trackActions.actions$;
    this.init = true;
    const mapInstance = this.mapService.mapInstance;
    this.actionsTrace = new ActionTrace(mapInstance);
    this.actionsTrace.setData$(this.actionsData$);

  }

  ngAfterContentInit() {


  }

}
