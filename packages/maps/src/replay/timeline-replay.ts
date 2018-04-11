import * as _ from 'underscore';
import {IReplayHead, IReplayPlayer, IReplayStats} from "../interfaces";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ITimeAwarePoint, ITimelineEvent, HtPosition} from "ht-models";
import {timer} from "rxjs/observable/timer";
import {TimeAwareEncoder} from "time-aware-polyline";
import {filter, map, share, switchMap, take, takeUntil} from "rxjs/operators";
import {Observable} from "rxjs/Observable";

export class TimelineReplay extends TimeAwareEncoder {
  timeAwareArray: ITimeAwarePoint[];
  map;
  stats;
  stats$: BehaviorSubject<any> = new BehaviorSubject(null);
  head;
  head$: BehaviorSubject<any> = new BehaviorSubject(null);
  playerSub;
  player$: BehaviorSubject<IReplayPlayer> = new BehaviorSubject({isPlaying: false, isStopped: true, speed: 2});
  player: IReplayPlayer;
  debug: boolean = false;
  frameInterval: number = 50;
  skipStops: boolean =  false;
  constructor() {
    super();
    this.addListerner();
  }

  addListerner() {
    this.stats$.subscribe((stats) => {
      this.stats = stats
    });

    this.head$.subscribe((head) => {
      this.head = head
    });

    this.player$.subscribe((player) => {
      this.player = player;
      if(player.isStopped) this.currentSegmentEffects(null)
    })
  }

  getPositionBearingnAtTime(time: string): {position: HtPosition, bearing: number} {
    if(!this.stats) return null;
    // let currentTimeValue = (timePercent * (this.stats.duration) / 100) + new Date(this.stats.start).getTime();
    // let time = new Date(currentTimeValue).toISOString();
    // console.log(TimeString(time));
    // if(this.player && !this.player.isStopped)
    // if(segment) console.log(segment.type, "segment", TimeString(segment.started_at), TimeString(segment.ended_at));
    var position: any;
    var bearing;
    let pathSegment: any = this.getLocationsTillTimeStamp(this.timeAwareArray, time);
    if (pathSegment && pathSegment.locations.length > 0) {
      // let pathBeaing = _.last(pathSegment);
      let point = _.last(pathSegment.locations);
      position = {lat: point[0], lng: point[1]};
      bearing = pathSegment.bearing;
      // return [point[0], point[1]]
    } else {
      // return null
    }
    return {position, bearing}

  }

  setStats(stats: IReplayStats | null) {
    this.stats$.next(stats)
  }

  setReplayHead(head: IReplayHead | null) {
    this.head$.next(head)
  }

  getReplayStats(): Observable<any> {
    return this.stats$.pipe(
      share()
    )
  }

  getReplayHead() {
    return this.head$.pipe(
      share()
    )
  }

  currentTimeEffects(time) {

  }

  currentSegmentEffects(segment) {

  }

  getLastPositionBearing() {
    let lastSegTime = _.last(this.timeAwareArray)[2]+'';
    return this.getPositionBearingnAtTime(lastSegTime)
  }

  getLocationsAtTimesT(times: string[]) {
    return this.getLocationsAtTimestamps(this.timeAwareArray, times);
  }


  // getBounds(bounds: L.LatLngBounds) {
  //   return _.reduce(this.timeAwareArray, (bounds, point) => {
  //     return bounds.extend([+point[0], +point[1]])
  //   }, bounds)
  // }

  private getNoTrackingSegments(events: ITimelineEvent[]) {
    return _.reduce(events, (acc: {segments: string[][], start: string}, event: ITimelineEvent) => {
      if(acc.start && event.type == 'tracking.started') {
        return {
          segments: [...acc.segments, [acc.start, event.recorded_at]],
          start: ''
        }
      } else if(event.type == 'tracking.ended') {
        return {...acc, start: event.recorded_at}
      }
      return acc
    }, {
      segments: [],
      start: ""
    }).segments
  }

  //replay player
  goToTimePercent(timePercent: number, toPause: boolean = false) {
    if(timePercent < 0) timePercent = 0;
    if(timePercent > 100) timePercent = 100;
    let time = this.getTimeFromTimePercent(timePercent);
    if(toPause) {
      if(this.player.isStopped) this.setPlayer({isStopped: false});
      this.jumpToTime(time, timePercent)
    } else {
      this.goToTime(time, timePercent)
    }

  }

  jumpToTimePercent(timePercent: number) {
    this.goToTimePercent(timePercent, true)
  }

  private getNextTimePercent( head: IReplayHead): number {
    return head ? head.timePercent + this.getIncTimePercent(head) : 0;
  }

  private getIncTimePercent(head: IReplayHead): number {
    let normalSpeed = 6000;
    var duration =  normalSpeed / this.player.speed;
    let segment = head.currentSegment;
    if(segment) {
      if(segment.type == 'trip')  {
        let max = 2*60*60*1000;
        duration = (normalSpeed * Math.min(max, head.currentSegment.durationSeg)/max + normalSpeed) / this.player.speed;
      }
      let frameStep = duration / this.frameInterval;
      let segmentGap = (segment.endPercent - segment.startPercent);
      let segmentCurrentGap = segment.endPercent - head.timePercent;
      let maxInc =  segmentCurrentGap > 0 ? Math.min(segmentGap, segmentCurrentGap) : segmentGap;
      return  Math.min(segmentGap / frameStep, maxInc);
    } else {
      this.pause()
      return 0;
    }

  }

  private getTimeFromTimePercent(timePercent): string {
    let currentTimeValue = (timePercent * (this.stats.duration) / 100) + new Date(this.stats.start).getTime();
    let currentTime = new Date(currentTimeValue).toISOString();
    return currentTime;
  }

  jumpToTime(time: string, timePercent) {
    this.pause();
    this.goToTime(time, timePercent)
  }

  goToTime(time: string, timePercent) {
    //get head and update head$
  }

  clear() {
    if(!this.player.isStopped) this.stop();
    this.timeAwareArray = null;
    this.setStats(null);
  }

  play() {
    this.setPlayer({isStopped: false, isPlaying: true});
    const takeUtil$ = this.player$.pipe(
      filter(player => !player.isPlaying),
      take(1)
    );
    this.playerSub = timer(0, this.frameInterval).pipe(
      switchMap(() => this.head$.pipe(take(1))),
      map((head) => this.getNextTimePercent(head)),
      takeUntil(takeUtil$)
    )
      .subscribe((timePercent) => {
        this.goToTimePercent(timePercent)
      });
  }
  toggleSkipStops() {
    this.skipStops = !this.skipStops;
  }

  pause() {
    this.setPlayer({isPlaying: false})
  }

  stop() {
    this.jumpToTimePercent(0);
    this.setPlayer({isStopped: true, isPlaying: false, speed: 2});
    this.setReplayHead(null);
  }

  setSpeed(speed: number) {
    this.setPlayer({speed})
  }

  setPlayer(obj: Partial<IReplayPlayer>) {
    this.player$.next({...this.player, ...obj})
  }
}

