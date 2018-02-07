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

  setStyle() {
    const destination = this.actionsTrace.destination;
    const polyline = this.actionsTrace.polyline;
    const start = this.actionsTrace.start;
    const user = this.actionsTrace.user;

    destination.styleObj = {
      default: {
        opacity: 1,
        fillColor: '#00C94B',
        color: '#00C94B',
        fill: true,
        fillOpacity: 1,
        fillRule: 'nonzero',
        weight: 5,
        pane: 'markerPane'
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

    start.styleObj = {
      default: {
        stroke: false,
        fillColor: '#9013FE',
        fill: true,
        fillOpacity: 1,
        weight: 3,
        radius: 7
      },
      popup: {
        // offset: point(0, -35),
        offset: [0, -5],
        closeButton: false
      }
    }

    user.getDivContent = (data) => {
      const content = `
    <div style="border-radius: 50%; height: 60px; width: 60px; background: rgba(144,19,254,0.42) ">
  <div style="height: 30px; width: 30px; background-image: url('${data.photo}'); background-repeat: no-repeat;
  background-size: cover;     top: 15px;
    position: relative;
    left: 15px;
    border-radius: 50%;"></div>
</div> 
    `;
      return content
    }

  }

}
