import {AfterViewInit, Component, Inject, OnInit} from "@angular/core";
import * as fromRoot from "../../reducers";
import * as fromReplay from "../../actions/replay";
import {Store} from "@ngrx/store";
import {DOCUMENT} from "@angular/common";
import {Observable} from "rxjs/Observable";
import {BroadcastService} from "../../core/broadcast.service";
import {UserTraceService} from "../../users/user-trace.service";
import {InnerMapService} from "../map.service";
import {IReplayPlayer} from "../../trace/ht-js-map/interfaces";
import {fromEvent} from "rxjs/observable/fromEvent";

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.less']
})
export class ReplayComponent implements OnInit, AfterViewInit {

  icons = {
    hare: require('../../../images/hare-icon.png'),
    tortoise: require('../../../images/tortoise-icon.png')
  };
  stats$;
  head$;
  speed$;
  player$;
  isPlaying$;
  constructor(
     // private store: Store<fromRoot.State>,
     // public timelineReplay: TimelineReplay,
     // public userService: UserTraceService,
     private broadcast: BroadcastService,
     private userTraceService: UserTraceService,
     private mapService: InnerMapService,
     @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit() {
    this.stats$ = this.userTraceService.segmentsTrace.timelineSegment.getReplayStats();

    this.head$ = this.userTraceService.segmentsTrace.timelineSegment.head$;
    this.player$ = this.userTraceService.segmentsTrace.timelineSegment.player$;
    this.speed$ = this.player$.map(player => player.speed);
    this.isPlaying$ = this.player$.map((player: IReplayPlayer) => player.isPlaying);

  }

  ngAfterViewInit() {
    this.mapService.invalidate();
    this.broadcast.emit('reset-map')
  }

  get segments() {
    return this.userTraceService.segmentsTrace.timelineSegment.segments;
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
    this.userTraceService.segmentsTrace.timelineSegment.jumpToTimePercent(time)
  }

  stop() {
    this.userTraceService.segmentsTrace.timelineSegment.stop();
    this.broadcast.emit('replay-segment', '')
  }

  play() {
    this.userTraceService.segmentsTrace.timelineSegment.play();
  }

  pause() {
    this.userTraceService.segmentsTrace.timelineSegment.pause()
  }

  changeSpeed(speed) {
    this.userTraceService.segmentsTrace.timelineSegment.setSpeed(speed);
  }

  ngOnDestroy() {
    this.mapService.invalidate()
  }

}
