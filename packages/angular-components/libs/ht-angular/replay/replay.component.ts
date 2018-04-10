import { Component, OnInit, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {fromEvent} from "rxjs/observable/fromEvent";
import {IReplayPlayer, ReplayTrace} from "ht-maps";
import {HtMapService} from "../ht/ht-map.service";

@Component({
  selector: 'ht-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.scss']
})
export class ReplayComponent implements OnInit {
  @Input() replayTrace: ReplayTrace;
  stats$;
  head$;
  speed$;
  player$;
  isPlaying$;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private mapService: HtMapService
  ) { }

  ngOnInit() {
    this.stats$ = this.replayTrace.timelineSegment.getReplayStats();

    this.head$ = this.replayTrace.timelineSegment.head$;
    this.player$ = this.replayTrace.timelineSegment.player$;
    this.speed$ = this.player$.map(player => player.speed);
    this.isPlaying$ = this.player$.map((player: IReplayPlayer) => player.isPlaying);

  }

  ngAfterViewInit() {
    this.mapService.inValidateSize();
    // this.broadcast.emit('reset-map')
  }

  get segments() {
    return this.replayTrace.timelineSegment.segments;
  }

  jumpToTimePercent (e, timeline) {
    // console.log(e, timeline.offsetWidth, timeline.getBoundingClientRect());
    let timelineBounds = timeline.getBoundingClientRect();
    let timePercent = (e.clientX - timelineBounds.left) * 100 / timelineBounds.width;
    // console.log("wp", p);
    this.setTimePercent(timePercent)
    // this.timePercent$.next(p)
  }

  startDrag(event, timeline) {
    let timePercent$ = this.head$.take(1).map(head => {
      return head && head.timePercent ? head.timePercent : 0;
    });
    timePercent$.subscribe((percent) => {
      let currentX = event.clientX;
      let timelineBounds = timeline.getBoundingClientRect();
      let mouseUp$ = fromEvent(this.document, 'mouseup');
      fromEvent(this.document, 'mousemove').takeUntil(mouseUp$).subscribe((e: any) => {
        let incPercent = (e.clientX - currentX) * 100 / timelineBounds.width;
        let currentPercent = percent + incPercent;
        currentPercent = currentPercent > 100 ? 100 : currentPercent;
        currentPercent = currentPercent < 0 ? 0 : currentPercent;
        this.setTimePercent(currentPercent);
      })
    })

  }

  endDrag() {
    // this.dragSub.unsubscribe()
  }

  setTimePercent(time) {
    this.replayTrace.timelineSegment.jumpToTimePercent(time)
  }

  stop() {
    this.replayTrace.timelineSegment.stop();
    // this.broadcast.emit('replay-segment', '')
  }

  play() {
    this.replayTrace.timelineSegment.play();
  }

  pause() {
    this.replayTrace.timelineSegment.pause()
  }

  changeSpeed(speed) {
    this.replayTrace.timelineSegment.setSpeed(speed);
  }

  ngOnDestroy() {
    this.mapService.inValidateSize();
  }

}
