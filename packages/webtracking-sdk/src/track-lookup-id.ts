import * as $ from "jquery";
import {GetBaseUrl, GetReqOpt} from "./helpers";
import {IAction, IDecoded, ITrackActionResult, ITrackActionResults, ITrackOption} from "./model";
import {TrackAction} from "./track-action";
import {TrackActionOnMap} from "./track-action.new";

export class TrackLookupId {
  trackAction: TrackAction = new TrackAction();
  trackActions: any = {};
  map: google.maps.Map;
  actionPoll;
  constructor(public lookupId: string, public pk: string, public options) {
    this.getActionsFromLookupId(lookupId, (data) => {
      this.renderMap();
      this.initTracking(data)
    });
  }

  private renderMap() {
    let gMapsStyles = this.options.mapOptions.gMapsStyle || this.getDefaultGMapsStyle();
    let origin = new google.maps.LatLng(37.370641488030245, -122.07498079040533);
    this.map = new google.maps.Map(document.getElementById(this.options.mapId), {
      zoom: 14,
      center: origin,
      disableDefaultUI:true,
      scrollwheel: true,
      scaleControl: false,
      clickableIcons: false,
      styles: gMapsStyles
    });
  }

  private getDefaultGMapsStyle() {
    return [
      {
        "stylers": [
          {
            "saturation": -100
          }
        ]
      }
    ];
  }

  private getActionsFromLookupId(lookupId: string, cb) {
    $.ajax({
      url: `${GetBaseUrl()}actions/track/?lookup_id=${lookupId}`,
      ...GetReqOpt(this.pk)
    }).then((data: ITrackActionResults) => {
      cb(data)
    }, err => {
      this.options.onError && this.options.onError(err)
    })
  }

  pollActionsFromLookupId(lookupId: string) {
    this.actionPoll = setTimeout(() => {
      this.getActionsFromLookupId(lookupId, (data) => {
        let actions: IAction[] = data.results.map((result: ITrackActionResult) => {
          return result.actions[0];
        });
        this.trackActionsOnMap(actions);
        this.pollActionsFromLookupId(lookupId);
      });
    }, 2000);
  }

  initTracking(data: ITrackActionResults) {
    let actions: IAction[] = data.results.map((result: ITrackActionResult) => {
      return result.actions[0];
    });
    this.trackActionsOnMap(actions);
    this.pollActionsFromLookupId(this.lookupId);
  }

  trackActionsOnMap(actions: IAction[]) {
    actions.forEach((action: IAction) => {
      if (this.trackActions[action.id]) {
        this.trackActions[action.id].update(action);
      } else {
        this.trackActions[action.id] = new TrackActionOnMap(action, this.map, this.options);
      }
    });
  }
}

export function trackLookupId (shortCode: string, pk: string, options) {
  return new TrackLookupId(shortCode, pk, options)
}