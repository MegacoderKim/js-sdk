import * as $ from "jquery";
import {GetBaseUrl, GetReqOpt} from "./helpers";
import {IAction, IDecoded, ITrackActionResult, ITrackActionResults, ITrackActions, ITrackOption} from "./model";
import {TrackAction} from "./track-action";
import {TrackActionOnMap} from "./track-action.new";

export class TrackShortCode {
    trackAction: TrackAction = new TrackAction();
    trackActions: ITrackActions = {};
    map: google.maps.Map;
    actionPoll;
    constructor(public shortCode: string, public pk: string, public options) {
        this.getActionFromShortCode(shortCode, (data) => {
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

    private getActionFromShortCode(shortCode: string, cb) {
        $.ajax({
            url: `${GetBaseUrl()}actions/track/?short_code=${shortCode}`,
            ...GetReqOpt(this.pk)
        }).then((data: ITrackActionResults) => {
            cb(data)
        }, err => {
            this.options.onError && this.options.onError(err)
        });
    }

    pollActionsFromShortcode(shortCode: string) {
        this.actionPoll = setTimeout(() => {
            this.getActionFromShortCode(shortCode, (data) => {
                let actions: IAction[] = data.results.map((result: ITrackActionResult) => {
                    return result.actions[0];
                });
                this.trackActionsOnMap(actions);
                this.options.onActionsUpdate(actions);
                this.options.onUpdate(this.trackActions);
                this.pollActionsFromShortcode(shortCode);
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

    initTracking(data: ITrackActionResults) {
        let actions: IAction[] = data.results.map((result: ITrackActionResult) => {
            return result.actions[0];
        });
        this.trackActionsOnMap(actions);
        this.options.onActionsReady(actions);
        this.options.onReady(this.trackActions);
        this.pollActionsFromShortcode(this.shortCode);
    }
}

export function trackShortCode (shortCode: string, pk: string, options) {
    return new TrackShortCode(shortCode, pk, options)
}