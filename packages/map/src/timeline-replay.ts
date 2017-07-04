import {TimeAwarePolyline} from "./time-aware-polyline";
import {ISegment, IUserData} from "../model/user";
import * as _ from 'underscore';
import { IPathSegment} from "../model/common";
import {ITimelineEvent} from "../model/event";
import {TimeString} from "ht-js-utils";
import {IDecodedSegment} from "./interface";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/timer";
import 'rxjs/add/operator/switchMap';
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import "rxjs/add/operator/takeUntil";
import {IReplayHead, IReplayPlayer, IReplayStats} from "../interfaces";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export class TimelineReplay extends TimeAwarePolyline {
  // timeAwarePolyline: TimeAwarePolyline = new TimeAwarePolyline();
  polyline: L.Polyline = L.polyline([]);
  map;
  stats;
  stats$: Subject<any> = new Subject();
  head;
  head$: Subject<any> = new Subject();
  playerSub: Subscription;
  player$: BehaviorSubject<IReplayPlayer> = new BehaviorSubject({isPlaying: false, isStopped: true, speed: 1});
  player: IReplayPlayer;
  // timelineSegment = new TimelineSegment();
  debug: boolean = false;

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
      this.player = player
    })
  }

  getPositionBearingnAtTime(timePercent: number): {position: number[], bearing: number} {
    if(!this.stats) return null;
    let currentTimeValue = (timePercent * (this.stats.duration) / 100) + new Date(this.stats.start).getTime();
    let time = new Date(currentTimeValue).toISOString();
    // console.log(TimeString(time));
    this.currentTimeEffects(currentTimeValue);
    // if(segment) console.log(segment.type, "segment", TimeString(segment.started_at), TimeString(segment.ended_at));
    var position: any;
    var bearing;
    let pathSegment: IPathSegment[] = this.getPolylineSegmentsForLocationsElapsed(this.timeAwareArray, time);
    if (pathSegment && pathSegment.length > 0) {
      let pathBeaing = _.last(pathSegment);
      let point = _.last(pathBeaing.path);
      position = [point[0], point[1]];
      bearing = pathBeaing.bearing;
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

  getReplayStats() {
    return this.stats$.share()
  }

  getReplayHead() {
    return this.head$.share()
  }

  currentTimeEffects(time) {

  }

  getLastPositionBearing() {
    return this.getPositionBearingnAtTime(100)
  }

  getLocationsAtTimesT(times: string[]) {
    return this.getLocationsAtTimes(this.timeAwareArray, times);
  }


  getBounds(bounds: L.LatLngBounds = L.latLngBounds([])) {
    return _.reduce(this.timeAwareArray, (bounds, point) => {
      return bounds.extend([+point[0], +point[1]])
    }, bounds)
  }

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
    return head.timePercent + 0.5 * this.player.speed;
  }

  private getTimeFromTimePercent(timePercent): string {
    return ''
  }

  jumpToTime(time: string, timePercent) {
    this.pause();
    this.goToTime(time, timePercent)
  }

  goToTime(time: string, timePercent) {
    //get head and update head$
  }

  clear() {
    this.stop();
    this.timeAwareArray = null;
    this.stats = null;
  }

  play() {
    if(this.player.isStopped) this.setPlayer({isStopped: false});
    this.playerSub = Observable.timer(0, 100).switchMap(() => this.head$)
      .map((head) => this.getNextTimePercent(head))
      .takeUntil(this.player$.map(player => !player.isPlaying))
      .subscribe((timePercent) => {
        this.goToTimePercent(timePercent)
    })
  }

  pause() {
    this.setPlayer({isPlaying: false})
  }

  stop() {
    this.jumpToTimePercent(0);
    this.setPlayer({isStopped: true});
  }

  setSpeed(speed: number) {
    this.setPlayer({speed})
  }

  setPlayer(obj: Partial<IReplayPlayer>) {
    this.player$.next({...this.player, ...obj})
  }
}

