import { Injectable } from '@angular/core';
import {HtMapService} from "../ht/ht-map.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {MapInstance} from "ht-maps";
import {ActionTrace} from "ht-maps";
import {IAction, IActionWithPolyline} from "ht-models";
import { TrackingConfigService } from '../tracking/tracking-config.service';

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
  summarySetBoundsOptions = {
    paddingBottomRight: [15, 170]
  };
  setBoundsOptions =  this.defaultSetBoundsOptions;
  actionsTrace;
  destination;
  polyline;
  popups$;
  userPopup$;
  startPopup$;
  constructor(
    public mapService: HtMapService,
    private config: TrackingConfigService
  ) {
    this.mapInstance = this.mapService.mapInstance;

  }

  resetCleanMap(action) {
    if (!this.dirty$.getValue()) {
      this.mapService.resetBounds()
    }
    if (!this.checkDirtySub) {
      this.checkDirtySub = this.mapInstance.onEvent$('click mousedown dragstart')
        .subscribe(data => {
          this.dirty$.next(true);
        })
    }
  }

  setData$(actionsData$) {
    const mapInstance = this.mapService.mapInstance;
    if (!this.actionsTrace) this.actionsTrace = new ActionTrace(mapInstance, 
      {
        hasPulse: true,
        hideExpectedPolyline: this.config.hideExpectedPolyline,
        hideTrailingPolyline: this.config.hideTrailingPolyline
      }
    );
    this.setStyle();
    this.actionsTrace.setData$(actionsData$);
  }

  resetMap() {
    if (!this.actionCompleted) this.dirty$.next(false);
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
    /**
     * radius/innerRadius accepts values which are factor of 3 or 4 between 15 to 32
     */

    const destinationStyle = {
      radius: 20,
      innerRadius: 12,
      liveColor: "#250D47",
      summaryColor: "#250D47"
    };

    const polylineStyle = {
      color: '#9013FE',
      weight: 3,
    };

    const userStyle = {
      radius: 24,
      color: '#9013FE',
      markerSize: 15,
    };

    const destination = this.actionsTrace.destination;
    const polyline = this.actionsTrace.polyline;
    const start = this.actionsTrace.start;
    const user = this.actionsTrace.user;
    const pulse = this.actionsTrace.pulse;
    const expectedPolyline  = this.actionsTrace.expectedPolyline;
    polyline.toIncludeInBounds = false;
    start.toIncludeInBounds = false;
    user.styleObj = {
      default: {
        zIndexOffset: 12,
        iconSize: [userStyle.radius, userStyle.radius],
        className: "user-marker"
      }
    };
    pulse.styleObj = {
      default: {
        zIndexOffset: 10,
        iconSize: [userStyle.radius, userStyle.radius],
        className: "user-marker"
      }
    };

    destination.styleObj = {
      default: {
        zIndexOffset: 10,
        iconSize: [destinationStyle.radius, destinationStyle.radius],
        className: "destination-marker"
      }
    };
    polyline.toIncludeInBounds = false;
    polyline.styleObj = {
      default: {
        fillColor: polylineStyle.color,
        color: polylineStyle.color,
        weight: polylineStyle.weight
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
    };
    if (expectedPolyline) {
      expectedPolyline.styleObj = {
        default: {
          weight: polylineStyle.weight,
          color: polylineStyle.color,
          opacity: 1,
          dashArray: "5 10"
        }
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

    pulse.getDivContent = (data: IAction) => {
      const pulse = !data.user.display.is_warning ? 'pulse' : '';
      const color = data.user.display.is_warning ? '#FC5F5B' : userStyle.color;
      const content = `
    <div class="box-${userStyle.radius}" style="background: ${color}">
  <div class="box-${userStyle.radius} ${pulse}" style="background: ${color}; margin: auto">
</div>
</div> 
    `;
      return content
    };

    user.getDivContent = (data, bearing) => {
      return this.getUserDiv(data, bearing, userStyle);
    }

    destination.getDivContent = (action: IAction) => {
      if (action.completed_at) {
        return `<div class="box-${destinationStyle.radius}" style="background: ${destinationStyle.liveColor}">
<!--<div class="icon" style="font-size: 1.5rem; color: white; margin: auto">-->
        <!--<i class="ion-checkmark"></i>-->
      <!--</div>-->
</div>`
      } else {
        return `<div class="box-${destinationStyle.radius} is-bordered" style="display: flex; border-color: #${destinationStyle.summaryColor}">
    <div class="box-${destinationStyle.innerRadius}" style="background: ${destinationStyle.summaryColor}; margin: auto"></div>
</div>`
      }

    }

  }

  getUserDiv(action: IActionWithPolyline, bearing, userStyle): string {
    const cycleClass = "ion-android-bicycle";
    const walkClass = "ion-android-walk";
    const movingClass = "ion-android-navigate";
    const stopClass = "ion-stop";
    const errorClass = "ion-minus-circled";

    const activityType = action.activity.type;
    const iconClass = activityType == 'stop' ?
      stopClass : activityType == 'cycle' ?
        cycleClass : activityType == 'walk' ?
          walkClass : action.user.display.is_warning ?
            errorClass : movingClass;

    bearing = iconClass == movingClass ? bearing : 0;

    const iconDiv = `<i class="${iconClass}" style="margin: auto; 
    color: white; 
    font-size: ${userStyle.size}px; 
    transition: transform 0.4s;
    transform: rotate(${bearing}deg)"></i>`;

    const iconContainer = `<div class="box-${userStyle.radius}" style="position: absolute">
      ${iconDiv}
      </div>`;

    return iconContainer
  }

}
