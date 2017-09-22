import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAction, ISegment, IUserData} from "ht-models";
import {NameCase} from "ht-js-utils";
import * as _ from "underscore";

@Component({
  selector: 'ht-placeline',
  templateUrl: './placeline.component.html',
  styleUrls: ['./placeline.component.less']
})
export class PlacelineComponent implements OnInit {

  @Output() segmentId = new EventEmitter();
  @Output() hoveredAction = new EventEmitter();
  @Output() selectedSegment = new EventEmitter();
  @Input() userData: IUserData;
  @Input() selectedPartialSegmentId: string;
  selectedAction: string | null = null;
  selectedActivity: string | null = "";
  hardSelectedActivity: string | null = "";
  // icons = TaskCardIcon;
  actionMap = {};
  isMobile: boolean = false;
  constructor(private ref: ChangeDetectorRef) {

  }

  selectInUserData(segment, event?) {
    if (segment && (segment.type === 'trip' || segment.type === 'stop')) {
      this.hardSelectedActivity = segment.id;
      this.selectedSegment.next({segments: [segment]})
    } else {
      this.hardSelectedActivity = "";
      this.selectedSegment.next(null);
      if (event) event.stopPropagation()
    }
  }

  selectSegment(segment, toShow: boolean = true) {
    if (segment.actionText) {
      const actionId = toShow ? segment.action_id : null;
      this.selectAction(actionId)
    } else {
      const userId = toShow ? segment.id : null;
      this.selectActivity(userId)
    }
  }

  hoverActivity(activityId) {
    this.selectedActivity = activityId;
    this.ref.markForCheck()
  }

  selectActivity(activityId) {
    this.segmentId.next(activityId);
    this.hoverActivity(activityId);
    // console.log(this.selectedActivity, "sele");
  }

  selectAction(actionId) {
    this.selectedAction = actionId;
    this.hoveredAction.next(actionId);
    this.ref.markForCheck()
  }

  get placelineMod() {
    const placeline = this.userData;
    if (this.userData.segments.length === 0) return [];
    const actions = placeline.actions;
    this.actionMap = {};
    const {currentActions, expActions} = this.currentExpActions(actions);
    const allEvents = this.userData.events;


    let {activitySegments} = _.reduce(this.userData.segments, (acc, segment: ISegment) => {
      const time = segment.started_at;
      const activityText = this.getActivityText(segment);
      const activityClass = this.getActivityClass(segment);
      const placeAddress = this.getActivityPlaceAddress(segment);
      const lastSeg = segment;
      const gapSegment = this.getGapSegment(segment, acc.lastSeg);
      // let lastSeg = _.last(acc.activitySegments);
      const currentActivitySegment = {...segment, time, events: [], ...this.getSegmentStyle(activityClass), activityText, placeAddress};
      const events = _.reject(acc.events, (event) => {

        if (this.isEventInSegment(segment, event)) {
          // event = {...event, ...this.getEventDisplay(event)};
          const eventDisplay = this.getEventDisplay(event);
          if (eventDisplay) currentActivitySegment.events.push({...event, ...eventDisplay});
          return true
        }
        return false
      });
      // console.log(gapSegment, "gap");
      let activitySegments =  [...acc.activitySegments, ...gapSegment, currentActivitySegment];
      // let activitySegments =  [...acc.activitySegments, currentActivitySegment];
      return {activitySegments, events, lastSeg};
    }, {activitySegments: [], events: allEvents, lastSeg: null});


    const lastSeg = this.lastSeg(placeline);
    // activitySegments.push(lastSeg);
    // return activitySegments


    let {actionSegments, actionEvents} = _.reduce([...activitySegments, lastSeg], (acc, segment, i, placelineM) => {
      activitySegments = acc.activitySegments;
      let lastSeg = segment;
      let activityClass = acc.lastSeg ? acc.lastSeg.activityClass : 'no-info';
      let actionSegments = acc.actionSegments;
      let actionEvents = _.reject(acc.actionEvents, (actionEvent) => {
        let actionMin = this.getMinute(actionEvent.actionTime);
        let segTime = this.getMinute(segment.time);
        if(actionMin == segTime && !segment.ended && !segment.actionText) {
          // if(actionEvent.actionTime == segment.time) {
          let actionSegment = this.createActionSegment(actionEvent, activityClass, acc.lastSeg);
          segment = {...actionSegment, ...segment};
          return true
        } else if(actionEvent.actionTime <= segment.time) {
          // console.log("np match");
          let actionSegment = this.createActionSegment(actionEvent, activityClass, acc.lastSeg);
          actionSegments.push(actionSegment);
          return true
        } else {
        }
        return false
      });
      if(segment.ended && !segment.actionText) {
      } else if(segment.ended) {
        activitySegments.push({...segment, ended: false});
      } else {
        activitySegments.push(segment);
      }
      // activitySegments.push(segment);
      return {activitySegments, actionEvents, lastSeg, actionSegments}
    }, {activitySegments: [], actionEvents: currentActions, lastSeg: null, actionSegments: []});
    // activitySegments.pop();

    let unsortedCurrentSegment = [...activitySegments, ...actionSegments];
    let currentSegment = _.sortBy(unsortedCurrentSegment, (segment) => {
      return segment.time
    });
    let restActiviySegments = _.map(actionEvents, (actionEvent, i) => {
      lastSeg['activityBorder'] = 'no-info-border';
      lastSeg['activityText'] = 'No information';
      // let activityClass = i < actionEvents.length - 2 ? 'no-info' : 'line';
      return this.createActionSegment(actionEvent, 'no-info')
    });
    let expActionSegments = _.map(expActions, (actionEvent, i, expEvents) => {
      if(actionEvents.length === 0) {
        lastSeg['activityBorder'] = 'line-border';
      }
      const activityClass = i < expEvents.length - 2 ? 'line' : '';
      return this.createActionSegment(actionEvent, activityClass)
    });
    // console.log(actionSegments, expActionSegments, "ac");
    // console.log("last seeg", lastSeg);
    // console.log(activitySegments.length,actionSegments.length , expActionSegments.length);
    // console.log(this.userData.segments.length, this.userData.actions.length);
    return lastSeg['time'] ?
      [...currentSegment, lastSeg, ...restActiviySegments, ...expActionSegments] : [...currentSegment, ...expActionSegments]
  }

  private createActionSegment(actionEvent, activityClass = 'no-info', seg = {}) {
    let id = seg ? seg['id'] : '';
    return {...actionEvent, time: actionEvent.actionTime, ...this.getSegmentStyle(activityClass), ended: false, isLive: false, id};
  }

  private getSegmentStyle(activityClass = 'no-info') {
    return activityClass ?
      {
        activityBg: `${activityClass}-bg`,
        activityBorder: `${activityClass}-border`,
        activityClass,
        activityColor: `${activityClass}-color`
      } : {}
  }

  private isEventInSegment(segment, event): boolean {
    if (!!segment.ended_at && !!event.recorded_at) {
      const eventMin = this.getMinute(event.recorded_at);
      const segEndMin = this.getMinute(segment.ended_at);
      const segStartMin = this.getMinute(segment.started_at);
      return eventMin >= segStartMin && eventMin <= segEndMin;
    }
    return false;
  }

  private getMinute(time: string) {
    const timeStamp = new Date(time).getTime();
    return Math.round(timeStamp - timeStamp % 60000)
  }

  private currentExpActions(actions: IAction[]) {
    return _.reduce(actions, (acc, action: IAction) => {
      let expActions = [];
      this.actionMap = this.setActionMap(action);
      const assign = {
        actionText: `${NameCase(action.type)} assigned`,
        actionTime: action.assigned_at,
        actionD: NameCase(action.type[0]) + this.actionMap[action.id],
        action_id: action.id,
        actionLookupId: action.lookup_id,
        ...action
      };
      let currentActions = (assign.actionTime) ? [...acc.currentActions, assign] : acc.currentActions;
      if (action.display.ended_at) {
        const end = {
          actionText: `${NameCase(action.type)} ${action.status}`,
          actionTime: action.display.ended_at,
          actionD: NameCase(action.type[0]) + this.actionMap[action.id],
          actionEnd: true,
          action_id: action.id,
          action_distance: action.distance,
          action_duration: action.duration,
          actionEnded: true,
          actionLookupId: action.lookup_id,
          ...action
        };
        currentActions = [...currentActions, end];
      } else {
        const end = {
          actionText: `${NameCase(action.type)} scheduled`,
          actionTime: action.eta || null,
          actionD: NameCase(action.type[0]) + this.actionMap[action.id],
          actionEnd: true,
          action_id: action.id,
          action_distance: action.distance,
          action_duration: action.duration,
          actionLookupId: action.lookup_id,
          ...action
        };
        expActions.push(end)
      }

      return {currentActions, expActions}
    }, {currentActions: [], expActions: []});
  }

  // private getActionsSegments(segment: ISegment, actionsEvents, lastSeg) {
  //   let currentSegment = {};
  //   let start = segment.started_at;
  //   let lastStart = lastSeg ? lastSeg.started_at : null;
  //
  //   preSegment = _.filter(actionsEvents, (actionEvent) => {
  //     return lastStart ? (actionEvent.actionTime < start && actionEvent.actionTime > lastStart) : actionEvent.actionTime < start
  //   });
  //   postSegment = _.filter(actionsEvents, (actionEvent) => {
  //     return lastStart ? (actionEvent.actionTime > start && actionEvent.actionTime > lastStart) : actionEvent.actionTime < start
  //   });
  //   return {preSegment, postSegment, currentSegment}
  // }

  private lastSeg(placeline: IUserData) {
    let lastSeg: ISegment = _.last(placeline.segments);
    if(!lastSeg) return {};
    // let last = {time: lastSeg['last_heartbeat_at']};
    let pipeClass = "";
    let time;
    let isLive = false;
    if(lastSeg.ended_at) {
      time = lastSeg.ended_at
    } else {
      isLive = true;
      time = placeline.last_heartbeat_at
    }
    const activityClass = this.getActivityClass(lastSeg);
    return {time, pipeClass, lastSeg: true, isLive, ended: true, activityClass, activityBg: `${this.getActivityClass(lastSeg)}-bg`}
  }

  private getActivityClass(segment) {
    const type = segment.type;
    if (type === 'location_void') {
      return 'warning'
    }
    return type === 'stop' ? 'stop' : 'trip'
  }

  getPipeClass(status: string) {

    return status === 'stop' ? 'stop solid' : 'trip solid'
  }

  private getActivityText(segment: ISegment | any) {
    if(segment.activity) {
      return segment.activity
    } else if (segment.type === 'stop') {
      return 'Stop'
    } else if(segment.reason) {
      return this.getLocationVoidText(segment)
    } else {
      return NameCase(segment.type)
    }
  }

  private getActivityPlaceAddress(segment: ISegment) {
    if (segment.type === 'stop' && segment.place && segment.place.locality) {
      return segment.place.locality
    }
    return ""
  }

  private getLocationVoidText(segment) {
    switch (segment.reason) {
      case 'disabled':
        return "Location disabled";
      case 'no_permission':
        return "Location permission unavailable";
      case 'unknown':
        return "Location unavailable";
      default:
        return "Location unavailable"
    }
  }

  private getEventDisplay(event) {
    switch (event.type) {
      case 'tracking.started':
        return {
          text: 'Tracking started',
          subtext: ''
        };
      case 'tracking.ended':
        return {
          text: 'Tracking ended',
          subtext: ''
        };
      // case 'device.location.disabled':
      //   return {
      //     text: 'Location disabled',
      //     subtext: ''
      //   };
      // case 'device.location.enabled':
      //   return {
      //     text: 'Location enabled',
      //     subtext: ''
      //   };
      // case 'device.location_permission.disabled':
      //   return {
      //     text: 'Location permission disabled',
      //     subtext: ''
      //   };
      // case 'device.location_permission.enabled':
      //   return {
      //     text: 'Location permission enabled',
      //     subtext: ''
      //   };
      case 'device.secondary.ignored':
        return {
          text: 'Secondary device ignored',
          subtext: ''
        };
    }
  }

  private getGapSegment(segment, lastSeg) {
    let gaps = [];
    if (!lastSeg) return [];
    if (segment.started_at && lastSeg.ended_at) {
      const endMin = this.getMinute(segment.started_at);
      const startMin = this.getMinute(lastSeg.ended_at);
      const duration = (new Date(segment.started_at).getTime() -  new Date(lastSeg.ended_at).getTime()) / 1000
      if (endMin !== startMin && startMin < endMin) {
        const gap = {
          ...this.getSegmentStyle('no-info'),
          time: lastSeg.ended_at,
          activityText: 'No information',
          events: [],
          duration, id: "asd"
        };
        gaps.push(gap)
      }
    }
    return gaps
  }

  private setActionMap(action) {
    const actionMap = this.actionMap;
    const type = action.type;
    const id = action.id;
    const typeCount = this.actionMap[type];
    const actionShort = this.actionMap[id];
    if (typeCount) {
      if (!actionShort) {
        actionMap[type] = this.actionMap[type] + 1;
        actionMap[id] = '' + this.actionMap[type]
      }

    } else {
      actionMap[type] = 1;
      actionMap[id] = ''

    }
    // console.log(actionMap, "map");
    return {...actionMap}
  }

  indexId(index, item){
    return item.id
  }

  indexPlaceline(index, item) {
    return item.time || ""
  }

  log(a) {
    console.log(a)
  }

  ngOnInit() {
  }

}
