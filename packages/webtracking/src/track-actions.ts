import {GetBaseUrl, GetReqOpt} from "./helpers";
import {
  IAction, ISubAccount, ISubAccountData, ITrackActionResult, ITrackActionResults,
  ITrackingOptions
} from "./model";
import {MapInstance} from "ht-maps";
import { BehaviorSubject} from "rxjs/BehaviorSubject";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Observable} from "rxjs/Observable";

export class HTTrackActions {
  // trackActions: ITrackedActions = {};
  mapInstance: MapInstance;
  pollActionsTimeoutId;
  actionsSubject$: ReplaySubject<IAction[]> = new ReplaySubject();
  actions$: Observable<IAction[]> = this.actionsSubject$.asObservable();

  subAccountSubject$: ReplaySubject<ISubAccountData>  = new ReplaySubject<ISubAccountData>();
  subAccountData$ = this.subAccountSubject$.asObservable();
  constructor(private identifier: string, private identifierType: string, private pk: string, private options: ITrackingOptions = {}) {
    this.mapInstance = new MapInstance();
    this.mapInstance.setMapType('google');
    this.fetchActionsFromIdentifier(identifier, identifierType, (data) => {
      this.initTracking(data, identifier, identifierType);
    }, () => {

    });
  }

  get map(): google.maps.Map {
    return this.mapInstance.map as google.maps.Map;
  }

  initTracking(data: ITrackActionResults, identifier: string, identifierType: string) {
    let actions: IAction[] = this.extractActionsFromResult(data);
    this.actionsSubject$.next(actions);
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

  fetchActionsFromIdentifier(identifier: string, identifierType: string, cb, errorCb) {
    let url = this.getTrackActionsURL(identifier, identifierType);
    fetch(url, GetReqOpt(this.pk, this.options)).then(res => res.json()).then((data: ISubAccountData) => {
      cb(data)
    }, err => {
      this.options.onError && this.options.onError(err);
      errorCb();
    });
  }

  fetchSubaccountFromIdentifier(identifier: string, identifierType: string, cb) {
    let url = this.getSubaccountFromIdentifierURL(identifier, identifierType);
    fetch(url, GetReqOpt(this.pk, this.options)).then(res => res.json()).then((data: ISubAccountData) => {
      this.subAccountSubject$.next(data);
      cb(data)
    }, err => {
      this.options.onError && this.options.onError(err)
    });
  }

  pollActionsFromIdentifier(identifier: string, identifierType: string) {
    this.pollActionsTimeoutId = setTimeout(() => {
      this.fetchActionsFromIdentifier(identifier, identifierType, (data) => {
        let actions: IAction[] = this.extractActionsFromResult(data);
        this.actionsSubject$.next(actions);
        this.pollActionsFromIdentifier(identifier, identifierType);
      }, () => {
        this.pollActionsFromIdentifier(identifier, identifierType);
      });
    }, 2000);
  }

  getTrackActionsURL(identifier: string, identifierType: string) {
    switch (identifierType) {
      case 'shortCode':
        return `${GetBaseUrl()}actions/track/?short_code=${identifier}`;
      case 'lookupId':
        return `${GetBaseUrl()}actions/track/?lookup_id=${identifier}`;
      case 'collectionId':
        return `${GetBaseUrl()}actions/track/?collection_id=${identifier}`;
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
      case 'collectionId':
        return `${GetBaseUrl()}actions/deeplink/?collection_id=${identifier}`;
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
