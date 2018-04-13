import {Component, Input, OnInit, ViewChild, AfterViewInit, AfterContentInit} from '@angular/core';
import {PopperContent} from "../popper/popper-content";
import {HtMapService} from "../ht/ht-map.service";
import {debounceTime, tap, map, switchMap, take, takeUntil, throttle, throttleTime} from "rxjs/operators";
import {merge} from "rxjs/observable/merge";
import {animate, style, transition, trigger, state} from '@angular/animations';
import {empty} from "rxjs/observable/empty";

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
  idle: boolean = true;
  constructor(private mapService: HtMapService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const mapUtils = this.mapService.mapInstance.mapUtils;
    const thismap = this.mapService.mapInstance.map;
    const mapmoveEnd$ = mapUtils.onEvent$(thismap, 'moveend');
    const mapmoveStart$ = mapUtils.onEvent$(thismap, 'movestart');
    const moveEnd$ = mapUtils.onEvent$(thismap, 'mouseup mouseout dragend');
    const move$ = mapUtils.onEvent$(thismap, 'move');
    const moveStart$ = mapUtils.onEvent$(thismap, 'click mousedown dragstart');
    const load$ = mapUtils.onEvent$(thismap, 'load');
    merge(
      moveStart$.pipe(
        throttleTime(100),
        map(() => true)
      ),
      moveEnd$.pipe(
        debounceTime(100),
        map(() => false)
      ),
      load$.pipe(
        debounceTime(100),
        map(() => false)
      )
    )
    //   .pipe(
    //   tap((move) => {
    //     // console.log("move", move ? "start" : "end");
    //     if (move) {
    //       this.idle = false
    //     } else {
    //       this.idle = true;
    //       if (this.popper) this.popper.scheduleUpdate();
    //     };
    //   }),
    //   switchMap((move) => {
    //     console.log("move", move ? "start" : "end", move);
    //     if (move) {
    //       return empty()
    //     } else {
    //       return move$
    //     }
    //   })
    // )
    //   .subscribe((move) => {
    //     // console.log("move", move ? "start" : "end", move);
    //     if (move) {
    //       this.idle = false
    //     } else {
    //       this.idle = true;
    //     }
    // });

    // move$.pipe(
    //   switchMap(() => move$),
    //   takeUntil(mapmoveStart$.pipe(take(1)))
    // ).subscribe(() => {
    //   console.log("up");
    //   this.popper.scheduleUpdate();
    // })



    mapUtils.onEvent$(thismap, 'move').pipe(
      throttleTime(15)
    )
      .subscribe(() => {
      this.popper.scheduleUpdate();
    });
    if (this.item.onUpdate) this.item.onUpdate.subscribe((entity) => {
      this.popper.scheduleUpdate();
    })
  };

  onClick(e) {
    this.popper.scheduleUpdate();
  }

  ngAfterContentInit() {
    this.popper.scheduleUpdate();
  }

}
