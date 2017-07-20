import * as $ from "jquery";
import {GetBaseUrl, GetReqOpt, RenderGoogleMap} from "./helpers";
import {
  IAction, ITrackActionResult, ITrackActionResults, ITrackActions, ITrackingOptions
} from "./model";
import {TrackActionOnMap} from "./track-action.new";

export class HTTrackActions {
  trackActions: ITrackActions = {};
  map: google.maps.Map;
  actionPoll;
  constructor(private identifier: string, private identifierType: string, private pk: string, private options: ITrackingOptions) {
    this.getActionsFromIdentifier(identifier, identifierType, (data) => {
      this.initTracking(data, identifier, identifierType)
    });

  }

  private renderMap(actions) {
    this.map = RenderGoogleMap(this.options.mapId, this.options.mapOptions);
  }

  private getActionsFromIdentifier(identifier: string, identifierType: string, cb) {
    let url = this.getFetchActionsUrl(identifier, identifierType);
    $.ajax({
      url: url,
      ...GetReqOpt(this.pk)
    }).then((data: ITrackActionResults) => {
      cb(data)
    }, err => {
      this.options.onError && this.options.onError(err)
    });
  }

  private getFetchActionsUrl(identifier: string, identifierType: string) {
    switch (identifierType) {
      case 'shortCode':
        return `${GetBaseUrl()}actions/track/?short_code=${identifier}`;
      case 'lookupId':
        return `${GetBaseUrl()}actions/track/?lookup_id=${identifier}`;
      case 'actionId':
        return `${GetBaseUrl()}actions/track/?id=${identifier}`;
      default:
        return `${GetBaseUrl()}actions/track/?short_code=${identifier}`;
    }
  }

  pollActionsFromIdentifier(identifier: string, identifierType: string) {
    this.actionPoll = setTimeout(() => {
      this.getActionsFromIdentifier(identifier, identifierType, (data) => {
        let actions: IAction[] = data.results.map((result: ITrackActionResult) => {
          return result.actions[0];
        });
        this.trackActionsOnMap(actions);
        this.options.onActionsUpdate(actions);
        this.options.onUpdate(this.trackActions);
        this.pollActionsFromIdentifier(identifier, identifierType);
      });
    }, 2000);
  }

  trackActionsOnMap(actions: IAction[]) {
    actions.forEach((action: IAction) => {
      if (this.trackActions[action.id]) {
        this.trackActions[action.id].update(action);
      } else {
        this.trackActions[action.id] = new TrackActionOnMap(action, this.map, this.options.mapOptions);
      }
    });
  }

  initTracking(data: ITrackActionResults, identifier: string, identifierType: string) {
    let actions: IAction[] = data.results.map((result: ITrackActionResult) => {
      return result.actions[0];
    });
    this.renderMap(actions);
    this.trackActionsOnMap(actions);
    this.options.onActionsReady(actions);
    this.options.onReady(this.trackActions);
    this.pollActionsFromIdentifier(identifier, identifierType);
  }
}

export function trackActions (identifier: string, identifierType: string, pk: string, options: ITrackingOptions) {
  return new HTTrackActions(identifier, identifierType, pk, options);
}