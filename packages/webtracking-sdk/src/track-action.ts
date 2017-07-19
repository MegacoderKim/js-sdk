import {IAction, ITrackOption} from "./model";
import {FetchAction, GetLatLng} from "./helpers";
import * as $ from "jquery";
import {TimeAwareAnim} from "./trace/time-aware-anim";
import {Color} from "./color";
import {Destination} from "./trace/destination";
import {StartMarker} from "./trace/start-marker";
import * as _ from "underscore";
import {EndMarker} from "./trace/end-marker";
import * as Utils from './utils';

export class TrackAction {
    map: google.maps.Map;
    private anim: TimeAwareAnim = new TimeAwareAnim({strokeColor: Color.htPink});
    startMarker: StartMarker = new StartMarker();
    endMarker: EndMarker = new EndMarker();
    private actionPoll;
    destination: Destination = new Destination();
    action: IAction;
    options: ITrackOption;
    private pk: string;
    constructor() {}

    init(action: IAction, pk: string, options: ITrackOption) {
        this.action = action;
        this.pk = pk;
        this.options = options;
        if (options.mapOptions.vehicleIcon) {
            this.anim.setCustomVehicleIcon(options.mapOptions.vehicleIcon);
        }
        this.renderMap();
    }

    resetBounds(bottomPadding: number = this.options.mapOptions.bottomPadding) {
        if(this.action.display.show_summary) {
            this.showSummary(bottomPadding);
        } else {
            if(this.destination.getMap()) {
                let bounds = this.anim.getBounds();
                bounds.extend(this.destination.getPosition());
                this.map.fitBounds(bounds);
                bounds = this.extendedBounds(bounds, -bottomPadding);
                this.map.fitBounds(bounds);
                this.map.panToBounds(bounds);
            } else {
                this.map.setCenter(this.anim.getPosition())
            }
        }

    }

    setOptions(options: ITrackOption) {
        this.options = {...this.options, ...options}
    }

    private renderMap(): void {
        this.makeMap();
        this.trace();
        this.options.onReady && this.options.onReady(this);
        this.options.onActionReady && this.options.onActionReady(this.action)
        // this.resetBounds()
    }

    private getFirstOrigin(): google.maps.LatLng {
        let origin = new google.maps.LatLng(37.370641488030245, -122.07498079040533);
        if(this.action.user && this.action.user.last_location && this.action.user.last_location['geojson']) {
            origin = GetLatLng(this.action.user.last_location, 'geojson')
        } else if(this.action.started_place) {
            origin = GetLatLng(this.action.started_place)
        } else if(this.action.expected_place) {
            origin = GetLatLng(this.action.expected_place)
        }
        return origin;
    }

    private makeMap() {
        let origin = this.getFirstOrigin();
        if(!this.map) {
            let gMapsStyles = this.options.mapOptions.gMapsStyle || this.getDefaultGMapsStyle();
            this.map = new google.maps.Map(document.getElementById(this.options.mapId), {
                zoom: 14,
                center: origin,
                disableDefaultUI:true,
                scrollwheel: true,
                scaleControl: false,
                clickableIcons: false,
                styles: gMapsStyles
            });
        } else {
            this.map.setCenter(origin);
        }
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

    private trace() {
        if(this.action.display.show_summary) {
            this.showSummary();
        } else {
            if (this.action.time_aware_polyline) {
                this.anim.start(this.action, this.map);
            }
            this.startActionPoll();
            this.traceDestination();
            this.traceStart();
        }
    }

    traceStart() {
        if (this.action.encoded_polyline)  {
            let polylineArray = google.maps.geometry.encoding.decodePath(this.action.encoded_polyline);
            let startPoint = _.first(polylineArray);
            let startPosition = new google.maps.LatLng(startPoint.lat(), startPoint.lng());
            this.startMarker.setMarkerDiv();
            this.startMarker.render(startPosition, this.map);
        }
    }

    private startActionPoll() {
        this.actionPoll = setTimeout(() => {
            this.fetchAction()
        }, 2000)
    }

    private fetchAction() {
        FetchAction(this.action.id, this.pk).then((action: IAction) => {
            this.updateAction(action);
            this.startActionPoll()
        }, (err) => {
            if(this.options.onError) this.options.onError(err);
            this.startActionPoll()
        })
    }

    private updateAction(action: IAction) {
        this.action = action;
        if(this.action.display.show_summary) {
            this.showSummary()
        } else {
            this.anim.update(action);
            this.traceDestination();
        }
        this.options.onActionUpdate && this.options.onActionUpdate(action)
    }

    private traceDestination() {
        this.destination.update(this.action, this.map)
    }

    private showSummary(bottomPadding: number = this.options.mapOptions.bottomPadding) {
        this.drawAndFitPolyline(this.action.encoded_polyline, bottomPadding);
        this.clear()
    }

    private clear() {
        this.anim.clear();
        this.destination.clear();
        if(this.actionPoll) clearTimeout(this.actionPoll)
    }

    private drawAndFitPolyline(polylineEncoded, bottomPadding: number = this.options.mapOptions.bottomPadding) {
        let polylineArray = google.maps.geometry.encoding.decodePath(polylineEncoded);
        new google.maps.Polyline({
            map: this.map,
            path: polylineArray,
            strokeColor: "rgb(223, 92, 193)",
            strokeOpacity: 1,
            strokeWeight: 3,
            icons: []
        });
        if (polylineArray.length > 0) {
            this.startMarker.setMarkerDiv();
            this.endMarker.setMarkerDiv();
            let startPoint = _.first(polylineArray);
            let endPoint = _.last(polylineArray);
            let startPosition = new google.maps.LatLng(startPoint.lat(), startPoint.lng());
            let lastPosition = new google.maps.LatLng(endPoint.lat(), endPoint.lng());
            this.startMarker.render(startPosition, this.map);
            this.endMarker.render(lastPosition, this.map);
        }
        setTimeout(() => {
            //Utils.fitPolylineWithBottomPadding(this.map, polylineArray, bottomPadding);
            this.fitPolyline(polylineArray, bottomPadding);
        }, 200);
    }

    private fitPolyline(polylineMvc, bottomPadding) {
        let bounds = new google.maps.LatLngBounds();
        $.each(polylineMvc, (i, v) => {
            bounds.extend(v);
        });
        this.map.fitBounds(bounds);
        this.fitExtended(polylineMvc, bottomPadding)
    }

    private fitExtended(polylineMvc, bottomPadding) {
        let bounds = new google.maps.LatLngBounds();
        $.each(polylineMvc, (i, v) => {
            bounds.extend(v);
            let bottomPaddingValue = bottomPadding || this.options.mapOptions.bottomPadding;
            if(bottomPaddingValue) {
                bounds.extend(this.extendedLocation(v, -bottomPaddingValue));
            }
        });
        this.map.fitBounds(bounds);
    }

    private extendedLocation(location, y) {
        let projection = this.map.getProjection();
        if(projection) {
            let markerPoint = new google.maps.Point(projection.fromLatLngToPoint(location).x, projection.fromLatLngToPoint(location).y - y/(Math.pow(2, this.map.getZoom())));
            return projection.fromPointToLatLng(markerPoint)
        }
        return location;
    }

    private extendedBounds(bounds, y) {
        let southWest = bounds.getSouthWest();
        let extendedPosition = this.extendedLocation(southWest, y);
        bounds.extend(extendedPosition);
        return bounds;
    }

}

export function trackAction(action: IAction, pk: string, options: ITrackOption) {
    let track = new TrackAction();
    track.init(action, pk, options);
    return track;
}