import { Injectable } from '@angular/core';
import {HtMapService} from "../ht/ht-map.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {MapInstance} from "ht-maps";
import {ActionTrace} from "ht-maps";
import {IAction} from "ht-models";

@Injectable()
export class TrackingMapService {
  checkDirtySub: Subscription;
  mapInstance: MapInstance;
  dirty$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  actionCompleted: boolean = false;
  defaultSetBoundsOptions = {
    paddingTopLeft: [15, 15],
    paddingBottomRight: [15, 70],
    duration: 2,
    animate: true,
    easeLinearity: 0.2,
    // easeLinearity: 0.58,
  };
  setBoundsOptions =  this.defaultSetBoundsOptions;
  actionsTrace;
  destination;
  polyline;
  popups$;
  userPopup$;
  startPopup$;
  constructor(public mapService: HtMapService) {
    this.mapInstance = this.mapService.mapInstance;

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

  setData$(actionsData$) {
    const mapInstance = this.mapService.mapInstance;
    if(!this.actionsTrace) this.actionsTrace = new ActionTrace(mapInstance, {hasPulse: true});
    this.setStyle();
    this.actionsTrace.setData$(actionsData$);
  }

  resetMap() {
    if(!this.actionCompleted) this.dirty$.next(false);
  }

  onComplete(action) {
    this.actionsTrace.polyline.toIncludeInBounds = true;
    this.actionsTrace.start.toIncludeInBounds = true;
    this.setBoundsOptions = {...this.setBoundsOptions, paddingBottomRight: [15, 120]};
    this.mapService.resetBounds(this.setBoundsOptions);
    this.dirty$.next(true);
    this.actionCompleted = true;
  };

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
    <i class="ion-android-navigate" style="margin: auto; 
    color: white; 
    font-size: 17px; 
    transition: all 2s;
    transform: rotate(${bearing}deg)"></i>
</div>`
    }

    destination.getDivContent = (action: IAction) => {
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
