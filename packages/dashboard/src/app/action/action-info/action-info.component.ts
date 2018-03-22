import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAction} from "ht-models";
import {TaskCardIcon} from "../../asserts/task-card-marker";
import {config} from "../../config";
import {HMString, NameCase, TimeString} from "ht-utility";
import * as _ from "underscore";
import {IUserPlaceline} from "ht-models";

@Component({
  selector: 'app-action-info',
  templateUrl: './action-info.component.html',
  styleUrls: ['./action-info.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionInfoComponent implements OnInit {
  @Input() action: IAction;
  @Input() user: IUserPlaceline;
  @Output() onHoverAction: EventEmitter<null | string> = new EventEmitter();
  icons = TaskCardIcon;
  showExp: boolean = false;
  show = {
    exp: false,
    expToggle: false
  };
  timezone = config.timezone;
  constructor() { }

  ngOnInit() {
  }

  indexId(index, item){
    return item.id
  }

  getActionIcon(action) {
    return this.icons(action.type);
  }

  onDebug(action) {
    if(config.isStaff) {
      let url = `/debug/events;action_id=${action.id}`;
      if(this.user.placeline.length) {
        let user_id = this.user.id;
        let min = _.first(this.user.placeline)['started_at'];
        let max = _.last(this.user.placeline)['ended_at'] || new Date().toISOString();
        url = `${url};user_id=${user_id};min_recorded_at=${min};max_recorded_at=${max}`;
        console.log(url);
      };
      var win = window.open(url, '_blank');
      if (win) {
        //Browser has allowed it to be opened
        win.focus();
      } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
      }
    }
  }

  getActionSubstatus(action) {
    let expectedText = action.expected_at ? `Scheduled at ${TimeString(action.expected_at)}` : '';
    return (action.display.substatus ? action.display.substatus : expectedText);
  }

  getActionAddress(action) {
    let address = action.expected_place ? this.createAddressFromPlace(action.expected_place) : '';
    if (action.display.show_summary) {
      address = action.completed_place ? this.createAddressFromPlace(action.completed_place) : '';
    }
    return address;
  }

  createAddressFromPlace(place) {
    let placeName = place.name ? `${place.name}` : '';
    let placeAddress = placeName ? `, ${place.address}` : place.address;
    return `${placeName}${placeAddress}`;
  }

  getActionStatus(action) {
    let statusText = this.getActionType(action.type);
    let durationToAction = '';
    switch(action.status) {
      case 'completed':
        if (action.completed_at) {
          statusText = `${this.getActionType(action.type)} at ${TimeString(action.completed_at)}`;
        } else {
          statusText = `Completed ${this.getActionType(action.type)}`;
        }
        return statusText;
      case 'suspended':
        if (action.suspended_at) {
          statusText = `${this.getActionType(action.type)} at ${TimeString(action.suspended_at)}`;
        } else {
          statusText = `Suspended ${this.getActionType(action.type)}`;
        }
        return statusText;
      case 'canceled':
        if (action.canceled_at) {
          statusText = `${this.getActionType(action.type)} at ${TimeString(action.canceled_at)}`;
        } else {
          statusText = `Canceled ${this.getActionType(action.type)}`;
        }
        return statusText;
      case 'started':
        durationToAction = action.display.duration_remaining ? HMString(action.display.duration_remaining, 60) : '';
        statusText = `${this.getActionType(action.type)}`;
        // statusText+= durationToAction ? ` - ETA ${durationToAction}` : ``;
        return statusText;
      case 'assigned':
        durationToAction = action.display.duration_remaining ? HMString(action.display.duration_remaining, 60) : '';
        statusText = `${this.getActionType(action.type)}`;
        // statusText+= durationToAction ? ` - ETA ${durationToAction}` : ``;
        return statusText;
      default:
        return statusText;
    }
  }

  getActionType(actionType) {
    return NameCase(actionType)
  }

  selectAction(actionId: string | null) {
    this.onHoverAction.next(actionId)
  }

  isAwayFromExpected(action: IAction) {
    if(action.expected_place && action.event_flags) {
      let flag = _.find(action.event_flags, (flag) => {
        return flag['type'] == 'action.completed_at_different_place_than_expected'
      });
      return !!flag
    }
    return false;
  }

  getExpectedStatus(action: IAction) {
    if(!action.expected_at) return "";
    let gap = 0;
    if(action.completed_at) {
      gap = (new Date(action.expected_at).getTime() - new Date(action.completed_at).getTime()) / (1000 * 60);
      return gap > 0 ? `${HMString(gap)} early` :`${HMString(-gap)} late`
    } else if(action.eta && !action.display['ended_at']) {
      gap = (new Date(action.expected_at).getTime() - new Date(action.eta).getTime()) / (1000 * 60);
      return gap > 0 ? `${HMString(gap)} early` :`${HMString(-gap)} late`
    } else {
      return ""
    }
  }

}
