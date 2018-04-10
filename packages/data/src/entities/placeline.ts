import { IUserPlaceline, IAction, IEvent, IPlaceline, ITimelineEvent,IActionPlaceline, IUser } from "ht-models";
import {
  IActionMark,
  IActivitySegment,
  IEventMark,
  IPlacelineSegment,
  IProcSegment, ISegmentType
} from "../interfaces";
import { htEvent } from "./event";
import { NameCase, GetMinute } from "ht-utility";
import _ from "underscore";
import { CommonFunctions } from "../common";
import {isToday, format} from "date-fns";

export class HtPlaceline {
  constructor(public userData?: IUserPlaceline) {}

  getPlacelineSegments() {
    let userData = this.userData;
    let { lastSegment, activitySegments } = this.createActivitiesSegments(
      userData
    );
    let actionsMarks = this.createActionsMarks(userData.actions);
    let eventsMarks = _.map(userData.events, event =>
      this.createEventMark(event)
    );
  }

  createActivitiesSegments(userData: IUserPlaceline) {
    let segments = userData.placeline;
    let { lastSegment, activitySegments } = _.reduce(
      [...segments, {}],
      ({ lastSegment, activitySegments }, segment: IPlaceline) => {
        let nextLastSegment: IPlaceline | IPlacelineSegment = segment;
        if (lastSegment) {
          if (segment.id) {
            let activitySegment = this.createActivitySegment(lastSegment);
            if (activitySegment) activitySegments.push(activitySegment);
          } else {
            //last segment
            nextLastSegment = this.getLastSegment(
              segment,
              userData.last_heartbeat_at
            );
          }
        }
        return { lastSegment: nextLastSegment, activitySegments };
      },
      { activitySegments: [], lastSegment: null }
    );

    return { lastSegment, activitySegments };
  }

  createActivitySegment(segment: IPlaceline): IActivitySegment | null {
    let placelineTime = segment.started_at;
    let activityText = this.getActivityText(segment);
    let activityAddress = this.getActivityPlaceAddress(segment);
    let end = segment.duration && segment.started_at ? new Date(segment.started_at).getTime() + (segment.duration * 1000) : null;
    return {
      placelineTime,
      activityText,
      ...this.getActivityStyleClass(segment),
      segmentId: segment.id,
      segment,
      start: new Date(placelineTime).getTime(),
      end
    };
  }

  createEventSegment(
    eventMark: IEventMark,
    segment: IActivitySegment
  ): IProcSegment {
    return {
      ...segment,
      placelineTime: eventMark.event.recorded_at,
      ...eventMark
    };
  }

  createActionSegment(
    actionMark: IActionMark,
    segment: IActivitySegment
  ): IProcSegment {
    return { ...segment, placelineTime: actionMark.actionTime, ...actionMark };
  }

  createActionsMarks(actions: IAction[]): IActionMark[] {
    let actionMarksObj = _.reduce(
      actions,
      (acc, action: IAction) => {
        // acc.actionCountMap = this.setActionCountMap(action, acc.actionCountMap);
        // let assign: IActionMark = this.getActionMark(
        //   action,
        //   acc.actionCountMap,
        //   false,
        //   false
        // );
        // if (assign.actionTime) acc.actionMarks.push(assign);
        // let end = this.getActionMark(
        //   action,
        //   acc.actionMarks,
        //   true,
        //   !!action.display.ended_at
        // );
        // acc.actionMarks.push(end);
        return acc;
      },
      { actionMarks: [], actionCountMap: {} }
    );

    return actionMarksObj.actionMarks;
  }

  createEventMark(event: IEvent | ITimelineEvent): IEventMark {
    return { event, display: htEvent().getEventDisplay(event) };
  }

  getLastSegment(lastSeg: IPlaceline, lastHearbeatAt: string): IPlacelineSegment {
    // let last = {time: lastSeg['last_heartbeat_at']};
    let pipeClass = "";
    let placelineTime;
    let isLive = false;
    if (lastSeg.duration && lastSeg.started_at) {
      placelineTime = new Date(new Date(lastSeg.started_at).getTime() + 1000 * lastSeg.duration).toISOString();
    } else {
      isLive = true;
      placelineTime = lastHearbeatAt;
    }
    return {
      placelineTime,
      isLive,
      isLast: true,
      segmentId: lastSeg.id,
      ...this.getActivityStyleClass(lastSeg)
    };
  }

  isLive(placeline: IUserPlaceline) {
    let old = placeline.display.seconds_elapsed_since_last_heartbeat;
    let date = placeline.timeline_date;
    let status = placeline.display.status_text;
    return status !== "Tracking stopped" && old < 15 * 60 && isToday(new Date(date));
  }

  getSegmentTypes(userSegments: IPlaceline[]) {
    return _.reduce(
      userSegments,
      (segmentType: ISegmentType, segment: IPlaceline) => {
        if (segment.type == "stop") {
          if (segment.place && segment.place.location.coordinates)
            segmentType.stopSegment.push(segment);
        } else {
          if (segment.route) segmentType.tripSegment.push(segment);
        }
        return segmentType;
      },
      { tripSegment: [], stopSegment: [] }
    );
  }

  procActionPlaceline(actionPlaceline: IActionPlaceline): IUserPlaceline {
    let user = actionPlaceline.user as IUser;
    const placeline = actionPlaceline.placeline as IPlaceline[];
    const events = [];
    let action = {...actionPlaceline, placeline: null} as IAction;
    user.location = user.location || action.location;
    user.health = user.health || action.health;
    user.is_tracking = !!action.health && user.is_tracking;
    return {
      ...user,
      actions: [action],
      events,
      placeline: this.procPlaceline(placeline),
      timeline_date: null
    }
  };

  procUsersPlaceline(user: IUserPlaceline, query?): IUserPlaceline {
    if (user && query) {
      user.placeline = this.procPlaceline(user.placeline);
      const maxRecorded = query['max_recorded_at'];
      const today = maxRecorded ? isToday(new Date(maxRecorded)) : true;
      user.is_tracking = user.is_tracking && today;
      user.timeline_date = query['min_recorded_at'] ? format(query['min_recorded_at'], "YYYY-MM-DD") : user.timeline_date;
      user.min_recorded_at = query['min_recorded_at'];
      user.max_recorded_at = query['max_recorded_at'];
      return user;
    } else if(user) {
      user.placeline = this.procPlaceline(user.placeline);
      return user
    } else {
      return user
    }
  };

  procPlaceline(placelines: IPlaceline[]): IPlaceline[] {
    return placelines
  }

  //helpers
  private getActivityStyleClass(segment) {
    let activityClass = this.getActivityClass(segment);
    return this.getActivityStyle(activityClass);
  }

  private getActivityStyle(activityClass = "no-info") {
    return {
      activityBg: `${activityClass}-bg`,
      activityBorder: `${activityClass}-border`,
      activityClass,
      activityColor: `${activityClass}-color`
    };
  }

  private getActivityClass(segment): string {
    let type = segment.type;
    if (type == "location_void") {
      return "warning";
    }
    return type == "stop" ? "stop" : "trip";
  }

  private setActionCountMap(action, actionCountMap) {
    return CommonFunctions.setEntityCountMap(action, actionCountMap, "type");
  }

  private getActionMark(
    action: IAction,
    actionMap,
    isEnd: boolean,
    isDone: boolean
  ): IActionMark {
    return {
      actionText: `${NameCase(action.type)} scheduled`,
      actionTime: action.eta || null,
      actionDot: NameCase(action.type[0]) + actionMap[action.id],
      isEnd,
      isDone,
      action
    };
  }

  private getActivityText(segment: IPlaceline | any) {
    if (segment.activity) {
      return segment.activity;
    } else if (segment.type == "stop") {
      return "Stop";
    } else if (segment.reason) {
      return this.getLocationVoidText(segment);
    } else {
      return NameCase(segment.type);
    }
  }

  private getActivityPlaceAddress(segment: IPlaceline) {
    if (segment.type == "stop" && segment.place && segment.place.locality) {
      return segment.place.locality;
    }
    return "";
  }

  private getLocationVoidText(segment) {
    switch (segment.reason) {
      case "disabled":
        return "Location disabled";
      case "no_permission":
        return "Location permission unavailable";
      case "unknown":
        return "Location unavailable";
      default:
        return "Location unavailable";
    }
  }

  private getEventDisplay(event) {
    switch (event.type) {
      case "tracking.started":
        return {
          text: "Tracking started",
          subtext: ""
        };
      case "tracking.ended":
        return {
          text: "Tracking ended",
          subtext: ""
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
      case "device.secondary.ignored":
        return {
          text: "Secondary device ignored",
          subtext: ""
        };
    }
  }

  private getGapSegment(segment, lastSeg) {
    let gaps = [];
    if (!lastSeg) return [];
    if (segment.started_at && lastSeg.ended_at) {
      let endMin = GetMinute(segment.started_at);
      let startMin = GetMinute(lastSeg.ended_at);
      let duration =
        (new Date(segment.started_at).getTime() -
          new Date(lastSeg.ended_at).getTime()) /
        1000;
      if (endMin != startMin && startMin < endMin) {
        let gap = {
          ...this.getActivityStyle("no-info"),
          time: lastSeg.ended_at,
          activityText: "No information",
          events: [],
          duration,
          id: "asd"
        };
        gaps.push(gap);
      }
    }
    return gaps;
  }
}

export const htPlaceline = (userData?: IUserPlaceline) => new HtPlaceline(userData);
