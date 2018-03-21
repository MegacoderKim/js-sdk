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
  selector: 'ht-tracking',
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
    this.trackingMapService.setData$(this.actionsData$);
    this.popups$ = this.actionsData$.pipe(
      map((data) => {
        const entities = this.trackingMapService.actionsTrace.destination.entities;
        const keys = Object.keys(entities);
        const mapUtils = this.trackingMapService.actionsTrace.mapInstance.mapUtils;
        return keys.reduce((acc, key) => {
          const entity = entities[key];
          const elem = mapUtils.getElement(entity.item);
          return elem ? [...acc, {data: entity.data, elem, id: key}] : acc
        }, [])
      })
    );

    this.userPopup$ = this.actionsData$.pipe(
      debounceTime(300), // todo fix this null elem on first render
      map((data) => {
        const entities = this.trackingMapService.actionsTrace.user.entities;
        const keys = Object.keys(entities);
        const mapUtils = this.trackingMapService.mapInstance.mapUtils;
        return keys.reduce((acc, key) => {
          const entity = entities[key];
          const elem = mapUtils.getElement(entity.item);
          // console.log("elem", elem);
          const onUpdate = this.trackingMapService.actionsTrace.user.onEntityUpdate(key);
          return elem ? [...acc, {data: entity.data, elem, id: key, onUpdate}] : acc
        }, [])
      })
    );

    const completedAction$ = this.actionsData$.pipe(
      filter((data: IAction[]) => {
        return !!data && data.length && !!data[0].completed_at;
      }),
      take(1)
    );

    this.actionsData$.pipe(
      filter((data: IAction[]) => !!data && data.length && !data[0].completed_at),
      takeUntil(completedAction$)
    ).subscribe((action) => {
      this.loading = false;
      this.trackingMapService.resetCleanMap(action)
    });

    completedAction$.subscribe((action) => {
      this.loading = false;
      this.trackingMapService.onComplete(action);
    });

    this.startPopup$ = completedAction$.pipe(
      map((data: IAction[]) => {
        const entities = this.trackingMapService.actionsTrace.start.entities;
        const keys = Object.keys(entities);
        const mapUtils = this.trackingMapService.actionsTrace.mapInstance.mapUtils;
        return keys.reduce((acc, key) => {
          const entity = entities[key];
          const elem = mapUtils.getElement(entity.item);
          return elem ? [...acc, {data: entity.data, elem, id: key}] : acc
        }, [])
      })
    )

  }

  get error$() {
    return this.trackinService.error$
  }

  ngAfterContentInit() {


  };

  trackId(a, b) {
    return b.id
  }



}
