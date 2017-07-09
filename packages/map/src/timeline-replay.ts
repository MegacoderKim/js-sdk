import {TimeAwarePolyline} from "./time-aware-polyline";
import {ISegment, IUserData} from "../model/user";
import * as _ from 'underscore';
import { IPathSegment} from "../model/common";
import {ITimelineEvent} from "../model/event";
import {TimeString} from "ht-js-utils";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/timer";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import "rxjs/add/operator/takeUntil";
import {IReplayHead, IReplayPlayer, IReplayStats} from "./interfaces";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export class TimelineReplay extends TimeAwarePolyline {
  // timeAwarePolyline: TimeAwarePolyline = new TimeAwarePolyline();
  polyline: L.Polyline = L.polyline([]);
  map;
  stats;
  stats$: BehaviorSubject<any> = new BehaviorSubject(null);
  head;
  head$: BehaviorSubject<any> = new BehaviorSubject(null);
  playerSub;
  player$: BehaviorSubject<IReplayPlayer> = new BehaviorSubject({isPlaying: false, isStopped: true, speed: 1});
  player: IReplayPlayer;
  // timelineSegment = new TimelineSegment();
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

  getPositionBearingnAtTime(time: string): {position: number[], bearing: number} {
    if(!this.stats) return null;
    // let currentTimeValue = (timePercent * (this.stats.duration) / 100) + new Date(this.stats.start).getTime();
    // let time = new Date(currentTimeValue).toISOString();
    // console.log(TimeString(time));
    // if(this.player && !this.player.isStopped)
    // if(segment) console.log(segment.type, "segment", TimeString(segment.started_at), TimeString(segment.ended_at));
    var position: any;
    var bearing;
    let pathSegment: any = this.getPolylineSegmentForLocationsElapsed(this.timeAwareArray, time);
    if (pathSegment && pathSegment.locations.length > 0) {
      // let pathBeaing = _.last(pathSegment);
      let point = _.last(pathSegment.locations);
      position = [point[0], point[1]];
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

  getReplayStats() {
    return this.stats$.share()
  }

  getReplayHead() {
    return this.head$.share()
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
    return head ? head.timePercent + this.getIncTimePercent(head) : 0;
  }

  private getIncTimePercent(head: IReplayHead): number {
    let stats = this.stats;
    var duration =  3000 / this.player.speed;
    if(head.currentSegment.type == 'trip')  {
      let max = 2*60*60*1000;
      duration = (3000 * Math.min(max, head.currentSegment.durationSeg)/max + 3000) / this.player.speed;
    }
    let segment = head.currentSegment;
    let frameStep = duration / this.frameInterval;
    let step = (frameStep / head.currentSegment.durationSeg);
    let segmentGap = (segment.endPercent - segment.startPercent);
    return  Math.min(segmentGap / frameStep, segmentGap);
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

    this.playerSub = Observable.timer(0, this.frameInterval).switchMap(() => this.head$.take(1))
      .map((head) => this.getNextTimePercent(head))
      .takeUntil(this.player$.filter(player => !player.isPlaying).take(1))
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
    this.setPlayer({isStopped: true, isPlaying: false, speed: 1});
    this.setReplayHead(null);
  }

  setSpeed(speed: number) {
    this.setPlayer({speed})
  }

  setPlayer(obj: Partial<IReplayPlayer>) {
    this.player$.next({...this.player, ...obj})
  }
}

