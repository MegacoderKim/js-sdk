import {AfterContentInit, Component, Input, OnInit, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import { TrackingService } from './tracking.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {MapService} from '../core/map-service';
import { ActionTrace, DestinationMarker } from "ht-maps";
import {debounceTime, filter, map, take} from 'rxjs/operators';
import {ComponentPortal} from "@angular/cdk/portal";
import {PopperContent} from "../popper/popper-content";
import Popper from 'popper.js';
import {Color} from "ht-utility";
import {IAction} from "ht-models";

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
    this.actionsTrace = new ActionTrace(mapInstance, {hasPulse: true});
    this.actionsTrace.setData$(this.actionsData$);
    this.setStyle()
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
          const onUpdate = this.actionsTrace.user.onEntityUpdate(key);
          return elem ? [...acc, {data: entity.data, elem, id: key, onUpdate}] : acc
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

  setStyle() {
    const destination = this.actionsTrace.destination;
    const polyline = this.actionsTrace.polyline;
    const start = this.actionsTrace.start;
    const user = this.actionsTrace.user;
    const pulse = this.actionsTrace.pulse;
    polyline.toIncludeInBounds = false;
    start.toIncludeInBounds = false;
    user.styleObj = {
      default: {
        zIndexOffset: 12,
        iconSize: [24, 24],
        className: "user-marker"
      }
    };
    pulse.styleObj = {
      default: {
        zIndexOffset: 10,
        iconSize: [24, 24],
        className: "user-marker"
      }
    };

    destination.styleObj = {
      default: {
        zIndexOffset: 10,
        iconSize: [32, 32],
        className: "destination-marker"
      }
    }
    polyline.toIncludeInBounds = false;
    polyline.styleObj = {
      default: {
        fillColor: '#9013FE',
        color: '#9013FE',
        weight: 5
        // iconAnchor: [12, 12]
        // iconSize: [35, 35],
        // className: 'current-action-marker',
        // iconAnchor: point(15, 43)
        // iconAnchor: [15, 43]
      },
      popup: {
        // offset: point(0, -35),
        offset: [0, -5],
        closeButton: false
      }
    }

    // start.styleObj = {
    //   default: {
    //     stroke: false,
    //     fillColor: '#9013FE',
    //     fill: true,
    //     fillOpacity: 1,
    //     weight: 3,
    //     radius: 7
    //   },
    //   popup: {
    //     // offset: point(0, -35),
    //     offset: [0, -5],
    //     closeButton: false
    //   }
    // }

    pulse.getDivContent = (data) => {
      const pulse = data.user.availability_status == 'online' ? 'pulse' : '';
      const content = `
    <div class="box-24" style="background: rgba(144,19,254, 1)">
  <div class="box-24 ${pulse}" style="background: rgba(144,19,254, 1); margin: auto">
</div>
</div> 
    `;
      return content
    };

    user.getDivContent = (data, bearing) => {
      return `<div class="box-24" style="position: absolute">
    <i class="ion-android-navigate" style="margin: auto; color: white; font-size: 17px; transform: rotate(${bearing}deg)"></i>
</div>`
    }

    destination.getDivContent = (action: IAction) => {
      if (action.display.show_summary) {
        return `<div class="box-32" style="background: #00C94B"></div>`
      } else {
        return `<div class="box-32 is-bordered" style="display: flex; border-color: #250D47">
    <div class="box-16" style="background: #250D47; margin: auto"></div>
</div>`
      }

    }

  }

}
