import {Component, Input, OnInit, ViewChild, AfterViewInit, AfterContentInit} from '@angular/core';
import {PopperContent} from "../popper/popper-content";
import {HtMapService} from "../ht/ht-map.service";
import {debounceTime, tap, map, switchMap, take, takeUntil, throttle, throttleTime, sampleTime} from "rxjs/operators";
import {merge} from "rxjs/observable/merge";
import {animate, style, transition, trigger, state} from '@angular/animations';
import {empty} from "rxjs/observable/empty";
import {of} from "rxjs/observable/of";

@Component({
  selector: 'ht-infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.scss'],
  animations: [
    // state('hide', style({opacity: 0})),
    trigger('fade', [
      state('hide', style({opacity: 0})),
      transition("show => hide", [
        animate('100ms ease-out', style({opacity: 0}))
      ]),
      transition("hide => show", [
        style({opacity: 0}),
        animate('100ms ease-in', style({opacity: 1}))
      ])
    ])
  ]
})
export class InfoboxComponent implements OnInit, AfterViewInit, AfterContentInit {
  @ViewChild(PopperContent) popper: PopperContent;
  @Input() item: {
    data: any,
    elem: HTMLElement,
    id: string,
    onUpdate?: any;
  };
  idle: boolean = false;
  constructor(private mapService: HtMapService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const mapUtils = this.mapService.mapInstance.mapUtils;
    const thismap = this.mapService.mapInstance.map;
    const mapmoveEnd$ = mapUtils.onEvent$(thismap, 'moveend');
    const mapmoveStart$ = mapUtils.onEvent$(thismap, 'movestart');
    const moveEnd$ = mapUtils.onEvent$(thismap, 'mouseup mouseout dragend');
    const move$ = mapUtils.onEvent$(thismap, 'move zoomlevelschange');
    const moveStart$ = mapUtils.onEvent$(thismap, 'click tap mousedown dragstart');
    const load$ = mapUtils.onEvent$(thismap, 'load');
    merge(
      moveStart$.pipe(
        throttleTime(15),
        map(() => true)
      ),
      moveEnd$.pipe(
        debounceTime(15),
        map(() => false)
      ),
      load$.pipe(
        // debounceTime(15),
        map(() => false)
      )
    )
      .pipe(
      tap((move) => {
        // console.log("move", move ? "start" : "end");
        if (move) {
          if (this.popper) this.popper.scheduleUpdate();
          this.idle = true
        } else {
          this.idle = false;
          // if (this.popper) this.popper.scheduleUpdate();
        };
      }),
      switchMap((move) => {
        // console.log("swt", move);
        // console.log("move", move ? "start" : "end", move);
        if (!move) {
          return empty()
        } else {
          if (this.popper) this.popper.scheduleUpdate();
          return move$.pipe(
            sampleTime(15)
          )
        }
      })
    )
      .subscribe((move) => {
        if (this.popper) this.popper.scheduleUpdate();
        // console.log("mope");
        // console.log("move", move ? "start" : "end", move);
        // if (move) {
        //   this.idle = true
        // } else {
        //   this.idle = false;
        // }
    });

    // move$.pipe(
    //   switchMap(() => move$),
    //   takeUntil(mapmoveStart$.pipe(take(1)))
    // ).subscribe(() => {
    //   console.log("up");
    //   this.popper.scheduleUpdate();
    // })



    // mapUtils.onEvent$(thismap, 'move').pipe(
    //   throttleTime(15)
    // )
    //   .subscribe(() => {
    //   this.popper.scheduleUpdate();
    // });
    if (this.item.onUpdate) this.item.onUpdate.subscribe((entity) => {
      // this.popper.scheduleUpdate();
    })
  };

  onClick(e) {
    this.popper.scheduleUpdate();
  }

  ngAfterContentInit() {
    this.popper.scheduleUpdate();
  }

}
