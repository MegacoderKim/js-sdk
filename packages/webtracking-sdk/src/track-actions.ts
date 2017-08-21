import * as $ from "jquery";
import {GetActionsBounds, GetBaseUrl, GetReqOpt, RenderGoogleMap} from "./helpers";
import {
  IAction, ISubAccount, ISubAccountData, ITrackActionResult, ITrackActionResults, ITrackedActions, ITrackedData,
  ITrackingOptions
} from "./model";
import {TrackedAction} from "./track-action";
import {actionToTrackingData} from "./actions.helper";
import {TrackData} from "./track-data";

export class HTTrackActions {
  trackActions: ITrackedActions = {};
  trackMultipleData: ITrackedData = {};
  map: google.maps.Map;
  pollActionsTimeoutId;
  constructor(private identifier: string, private identifierType: string, private pk: string, private options: ITrackingOptions) {
    this.fetchActionsFromIdentifier(identifier, identifierType, (data) => {
      this.initTracking(data, identifier, identifierType);
    });
  }

  initTracking(data: ITrackActionResults, identifier: string, identifierType: string) {
    let actions: IAction[] = this.extractActionsFromResult(data);
    this.renderMap(actions);
    this.trackActionsOnMap(actions);
    if (this.options.onReady) {
      this.options.onReady(this.trackMultipleData, actions, this.map);
    }
    this.fetchSubaccountFromIdentifier(identifier, identifierType, (subAccount: ISubAccountData) => {
      if (this.options.onAccountReady) {
        this.options.onAccountReady(subAccount, actions);
      }
    });
    this.pollActionsFromIdentifier(identifier, identifierType);
  }

  extractActionsFromResult(data: ITrackActionResults) {
    let actions: IAction[] = [];
    data.results.forEach((result: ITrackActionResult) => {
      let actionsWithAccount = result.actions.map((action: IAction) => {
        return {
          ...action,
          account: result.account
        };
      });
      actions.push(...actionsWithAccount);
    });
    return actions;
  }

  renderMap(actions) {
    let initialBounds = GetActionsBounds(actions);
    let initialCenter = (initialBounds && !initialBounds.isEmpty()) ? initialBounds.getCenter() : null;
    this.map = RenderGoogleMap(this.options.mapId, this.options.mapOptions, initialCenter);
  }

  fetchActionsFromIdentifier(identifier: string, identifierType: string, cb) {
    let url = this.getTrackActionsURL(identifier, identifierType);
    $.ajax({
      url: url,
      ...GetReqOpt(this.pk)
    }).then((data: ITrackActionResults) => {
      cb(data)
    }, err => {
      this.options.onError && this.options.onError(err)
    });
  }

  fetchSubaccountFromIdentifier(identifier: string, identifierType: string, cb) {
    let url = this.getSubaccountFromIdentifierURL(identifier, identifierType);
    $.ajax({
      url: url,
      ...GetReqOpt(this.pk)
    }).then((data: ISubAccountData) => {
      cb(data)
    }, err => {
      this.options.onError && this.options.onError(err)
    });
  }

  pollActionsFromIdentifier(identifier: string, identifierType: string) {
    this.pollActionsTimeoutId = setTimeout(() => {
      this.fetchActionsFromIdentifier(identifier, identifierType, (data) => {
        let actions: IAction[] = this.extractActionsFromResult(data);
        this.trackActionsOnMap(actions);
        this.options.onUpdate(this.trackMultipleData, actions);
        this.pollActionsFromIdentifier(identifier, identifierType);
      });
    }, 2000);
  }

  trackActionsOnMap(actions: IAction[]) {
    actions.forEach((action: IAction) => {
      // if (this.trackActions[action.id]) {
      //   this.trackActions[action.id].update(action);
      // } else {
      //   this.trackActions[action.id] = new TrackedAction(action, this.map, this.options.mapOptions);
      // }
      let trackingData = actionToTrackingData(action);
      if (this.trackMultipleData[trackingData.id]) {
        this.trackMultipleData[trackingData.id].track(trackingData);
      } else {
        this.trackMultipleData[trackingData.id] = new TrackData(trackingData, this.map, this.options.mapOptions);
      }
    });
  }

  getTrackActionsURL(identifier: string, identifierType: string) {
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

  getSubaccountFromIdentifierURL(identifier: string, identifierType: string) {
    switch (identifierType) {
      case 'shortCode':
        return `${GetBaseUrl()}actions/deeplink/?short_code=${identifier}`;
      case 'lookupId':
        return `${GetBaseUrl()}actions/deeplink/?lookup_id=${identifier}`;
      case 'actionId':
        return `${GetBaseUrl()}actions/deeplink/?action_id=${identifier}`;
      default:
        return `${GetBaseUrl()}actions/track/?short_code=${identifier}`;
    }
  }
}

export function trackActions(identifier: string, identifierType: string, pk: string, options: ITrackingOptions) {
  return new HTTrackActions(identifier, identifierType, pk, options);
}