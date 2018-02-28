import { Injectable } from '@angular/core';
import {HtMapService} from "../ht/ht-map.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {MapInstance} from "ht-maps";
import {Observable} from "rxjs/Observable";
import {IAction} from "ht-models";
import {ActionTrace} from "ht-maps";

@Injectable()
export class TrackingMapService {
  checkDirtySub: Subscription;
  mapInstance: MapInstance;
  dirty$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  actionCompleted: boolean = false;
  actionsTrace;
  destination;
  polyline;
  start;
  user
  pulse
  constructor(public mapService: HtMapService) {
    this.mapInstance = this.mapService.mapInstance;
    this.actionsTrace = new ActionTrace(this.mapInstance, {hasPulse: true});
    this.setStyle()
  }

  resetCleanMap(action) {
    if(!this.dirty$.getValue()) {
      this.mapService.resetBounds()
    }
    if(!this.checkDirtySub) {
      this.checkDirtySub = this.mapInstance.onEvent$('click mousedown dragstart')
        .subscribe(data => {
          this.dirty$.next(true);
        })
    }
  }

  resetMap() {
    if(!this.actionCompleted) this.dirty$.next(false);
  }

  onComplete(action) {
    this.mapService.resetBounds();
    this.dirty$.next(true);
    this.actionCompleted = true;
  }

  setData$(data$: Observable<IAction[]>): void {
    this.actionsTrace.setData$(data$)
  };

  setStyle() {
    this.destination = this.actionsTrace.destination;
    this.polyline = this.actionsTrace.polyline;
    this.start = this.actionsTrace.start;
    this.user = this.actionsTrace.user;
    this.pulse = this.actionsTrace.pulse;
    this.polyline.toIncludeInBounds = false;
    this.start.toIncludeInBounds = false;
    this.user.styleObj = {
      default: {
        zIndexOffset: 12,
        iconSize: [24, 24],
        className: "user-marker"
      }
    };
    this.pulse.styleObj = {
      default: {
        zIndexOffset: 10,
        iconSize: [24, 24],
        className: "user-marker"
      }
    };

    this.destination.styleObj = {
      default: {
        zIndexOffset: 10,
        iconSize: [32, 32],
        className: "destination-marker"
      }
    }
    this.polyline.toIncludeInBounds = false;
    this.polyline.styleObj = {
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

    this.pulse.getDivContent = (data) => {
      const pulse = data.user.availability_status == 'online' ? 'pulse' : '';
      const content = `
    <div class="box-24" style="background: rgba(144,19,254, 1)">
  <div class="box-24 ${pulse}" style="background: rgba(144,19,254, 1); margin: auto">
</div>
</div> 
    `;
      return content
    };

    this.user.getDivContent = (data, bearing) => {
      return `<div class="box-24" style="position: absolute">
    <i class="ion-android-navigate" style="margin: auto; 
    color: white; 
    font-size: 17px; 
    transition: all 2s;
    transform: rotate(${bearing}deg)"></i>
</div>`
    }

    this.destination.getDivContent = (action: IAction) => {
      if (action.display.show_summary) {
        return `<div class="box-32" style="background: #00C94B">
<!--<div class="icon" style="font-size: 1.5rem; color: white; margin: auto">-->
        <!--<i class="ion-checkmark"></i>-->
      <!--</div>-->
</div>`
      } else {
        return `<div class="box-32 is-bordered" style="display: flex; border-color: #250D47">
    <div class="box-16" style="background: #250D47; margin: auto"></div>
</div>`
      }

    }

  }

}
