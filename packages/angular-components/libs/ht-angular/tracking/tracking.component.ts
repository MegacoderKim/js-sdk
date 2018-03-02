import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import { TrackingService } from './tracking.service';
import {animate, style, transition, trigger} from '@angular/animations';
import { ActionTrace } from "ht-maps";
import {debounceTime, filter, map, take, takeUntil} from 'rxjs/operators';
import {IAction} from "ht-models";
import {Observable} from "rxjs/Observable";
import {HtMapService} from "../ht/ht-map.service";
import {TrackingMapService} from "../tracking-map/tracking-map.service";

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
  animations: [
    trigger('fade', [
      transition(":leave", [
        animate('300ms ease-in', style({transform: `translateY(100%)`}))
      ])
    ])
  ]
})
export class TrackingComponent implements OnInit, AfterContentInit {
  @Input() shortCode;
  init: boolean = false;
  actionsData$: Observable<IAction[]>;
  actionsTrace;
  destination;
  polyline;
  popups$;
  userPopup$;
  startPopup$;
  loading: boolean = true;
  // actionSummaryComponent;
  constructor(
    private trackinService: TrackingService,
    public mapService: HtMapService,
    public trackingMapService: TrackingMapService
  ) {
  }

  ngOnInit() {
    this.trackinService.initShortCode(this.shortCode);
    // this.actionSummaryComponent = new ComponentPortal(this.trackinService.actionSummaryComponent);
    // console.log(this.actionSummaryComponent);
    this.actionsData$ = this.trackinService.actions$.asObservable();
    this.init = true;
    const mapInstance = this.mapService.mapInstance;
    this.actionsTrace = new ActionTrace(mapInstance, {hasPulse: true});
    this.actionsTrace.setData$(this.actionsData$);
    this.setStyle();
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
      debounceTime(100), //todo fix this null elem on first render
      map((data) => {
        const entities = this.actionsTrace.user.entities;
        const keys = Object.keys(entities);
        const mapUtils = this.actionsTrace.mapInstance.mapUtils;
        return keys.reduce((acc, key) => {
          const entity = entities[key];
          const elem = mapUtils.getElement(entity.item);
          // console.log("elem", elem);
          const onUpdate = this.actionsTrace.user.onEntityUpdate(key);
          return elem ? [...acc, {data: entity.data, elem, id: key, onUpdate}] : acc
        }, [])
      })
    );

    const completedAction$ = this.actionsData$.pipe(
      filter((data: IAction[]) => {
        return !!data && data.length && data[0].display.show_summary;
      }),
      take(1)
    );

    this.actionsData$.pipe(
      filter((data: IAction[]) => !!data && data.length && !data[0].display.show_summary),
      takeUntil(completedAction$)
    ).subscribe((action) => {
      this.loading = false;
      this.trackingMapService.resetCleanMap(action)
    });

    completedAction$.subscribe((action) => {
      this.loading = false;
      this.actionsTrace.polyline.toIncludeInBounds = true;
      this.actionsTrace.start.toIncludeInBounds = true;
      this.trackingMapService.onComplete(action);
    });

    this.startPopup$ = completedAction$.pipe(
      map((data: IAction[]) => {
        const entities = this.actionsTrace.start.entities;
        const keys = Object.keys(entities);
        const mapUtils = this.actionsTrace.mapInstance.mapUtils;
        return keys.reduce((acc, key) => {
          const entity = entities[key];
          const elem = mapUtils.getElement(entity.item);
          return elem ? [...acc, {data: entity.data, elem, id: key}] : acc
        }, [])
      })
    )

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