import {AfterContentInit, Component, Input, OnInit, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import { TrackingService } from './tracking.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {MapService} from '../core/map-service';
import { ActionTrace, DestinationMarker } from "ht-maps";
import {debounceTime, filter, map, take} from 'rxjs/operators';
import {ComponentPortal} from "@angular/cdk/portal";
import {PopperContent} from "../popper/popper-content";
import Popper from 'popper.js';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit, AfterContentInit {
  @Input() shortCode = "ofE2gTfo";
  init: boolean = false;
  actionsData$;
  actionsTrace;
  destination;
  polyline;
  popups$;
  userPopup$;
  // actionSummaryComponent;
  constructor(
    private trackinService: TrackingService,
    private mapService: MapService,
  ) {
  }

  ngOnInit() {
    this.trackinService.initShortCode(this.shortCode);
    // this.actionSummaryComponent = new ComponentPortal(this.trackinService.actionSummaryComponent);
    // console.log(this.actionSummaryComponent);
    this.actionsData$ = this.trackinService.trackActions.actions$;
    this.init = true;
    const mapInstance = this.mapService.mapInstance;
    this.actionsTrace = new ActionTrace(mapInstance);
    this.actionsTrace.setData$(this.actionsData$);

    this.popups$ = this.actionsData$.pipe(
      map((data) => {
        const entities = this.actionsTrace.destination.entities;
        const keys = Object.keys(entities);
        const mapUtils = this.actionsTrace.mapInstance.mapUtils;
        return keys.reduce((acc, key) => {
          const entity = entities[key];
          const elem = mapUtils.getElement(entity.item);
          return elem ? [...acc, {data: entity.data, elem, id: key}] : acc
        }, [])
      })
    );

    this.userPopup$ = this.actionsData$.pipe(
      map((data) => {
        const entities = this.actionsTrace.user.entities;
        const keys = Object.keys(entities);
        const mapUtils = this.actionsTrace.mapInstance.mapUtils;
        return keys.reduce((acc, key) => {
          const entity = entities[key];
          const elem = mapUtils.getElement(entity.item);
          return elem ? [...acc, {data: entity.data, elem, id: key}] : acc
        }, [])
      })
    )

    // this.actionsData$.pipe(filter(data => !!data), take(1)).subscribe((data) => {
    //   setTimeout(() => {
    //     const entities = this.actionsTrace.destination.entities;
    //     const keys = Object.keys(entities);
    //     const item = entities[keys[0]].item;
    //     this.elem = item.getElement();
    //     // var h = document.getElementById('tttt');
    //     // console.log(h);
    //     // var p = new Popper(this.elem, h);
    //     let map = this.mapService.mapInstance.map as L.Map
    //     map.on('move', () => {
    //       // p.scheduleUpdate()
    //     })
    //     // console.log(this.elem);
    //     // console.log(this.poper, "popper");
    //   }, 5000)
    //
    // })



  }

  ngAfterContentInit() {


  };

  trackId(a, b) {
    return b.id
  }

}
