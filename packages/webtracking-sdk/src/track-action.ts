import {IAction, ITrackOption} from "./model";
import {FetchAction, GetBaseUrl, GetLatLng, GetReqOpt, SetMap} from "./helpers";
import * as $ from "jquery";
import {TimeAwareAnim} from "./trace/time-aware-anim";
import {Color} from "./color";

export class TrackAction {
    map: google.maps.Map;
    anim: TimeAwareAnim = new TimeAwareAnim({strokeColor: Color.darkGreen});
    actionPoll;
    destination: google.maps.Marker = new google.maps.Marker();
    constructor(public action: IAction, private pk: string, public options: ITrackOption) {
        this.renderMap();
    }

    resetBounds() {
        let bounds = this.anim.getBounds();
        bounds.extend(this.destination.getPosition());
        this.map.fitBounds(bounds);
        this.map.panToBounds(bounds);
    }

    private renderMap() {
        this.makeMap();
        this.trace();
        this.options.onActionReady && this.options.onActionReady(this.action)
        // this.resetBounds()
    }

    private getFirstOrigin(): google.maps.LatLng {
        let origin = new google.maps.LatLng(37.370641488030245, -122.07498079040533);
        if(this.action.user && this.action.user.last_location) {
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
        this.map = new google.maps.Map(document.getElementById(this.options.mapId), {
            zoom: 14,
            center: origin,
            disableDefaultUI:true,
            scrollwheel: true,
            scaleControl: false,
            clickableIcons: false
        });
    }

    private trace() {
        if(this.action.display.show_summary) {
            this.showSummary()
        } else {
            this.anim.start(this.action, this.map);
            this.startActionPoll()
        }
        this.traceDestination()
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
            if(this.options.onError) this.options.onError(err)
        })
    }

    private updateAction(action: IAction) {
        this.action = action;
        if(this.action.display.show_summary) {
            this.showSummary()
        } else {
            this.anim.update(action)
        };
        this.traceDestination();
        this.options.onActionUpdate && this.options.onActionUpdate(action)
    }

    private traceDestination() {
        let finalPlace = this.action.completed_at || this.action.expected_place;
        if(finalPlace) {
            this.destination.setPosition(GetLatLng(finalPlace));
            SetMap(this.destination, this.map)
        } else {

        }
    }

    private showSummary() {
        this.drawAndFitPolyline(this.action.encoded_polyline);
        this.clear()
    }

    private clear() {
        this.anim.clear();
        this.destination.setMap(null);
    }

    private drawAndFitPolyline(polylineEncoded) {
        let polylineArray = google.maps.geometry.encoding.decodePath(polylineEncoded);
        new google.maps.Polyline({
            map: this.map,
            path: polylineArray,
            strokeColor: "rgb(10, 97, 194)",
            icons: [
                {
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: '#E63629',
                        fillOpacity: 1,
                        strokeOpacity: 0,
                        strokeColor: '#E63629',
                        scale: 4
                    },
                    offset: '100%',
                },
                {
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillOpacity: 0,
                        strokeWeight: 1,
                        strokeColor: '#E63629',
                        scale: 6
                    },
                    offset: '100%',
                },
                {
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: '#1C9A46',
                        fillOpacity: 1,
                        strokeOpacity: 0,
                        strokeColor: '#1C9A46',
                        scale: 4
                    },
                    offset: '0%',
                },
                {
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillOpacity: 0,
                        strokeWeight: 1,
                        strokeColor: '#1C9A46',
                        scale: 6
                    },
                    offset: '0%',
                }
            ]
        });
        setTimeout(() => {
            this.fitPolyline(polylineArray);
        }, 200);

    }

    private fitPolyline(polylineMvc) {
        // console.log(polylineMvc);
        var bounds = new google.maps.LatLngBounds();
        $.each(polylineMvc, (i, v) => {
            bounds.extend(v);
        });
        this.map.fitBounds(bounds);
        this.fitExtended(polylineMvc)
    }

    private fitExtended(polylineMvc) {
        var bounds = new google.maps.LatLngBounds();
        $.each(polylineMvc, (i, v) => {
            bounds.extend(v);

            if(this.options.bottomPadding) {
                bounds.extend(this.extendedLocation(v, -this.options.bottomPadding));
            }
        });
        this.map.fitBounds(bounds);
    }

    private extendedLocation(position, y) {
        var projection = this.map.getProjection();
        if(projection){
            var markerPoint = new google.maps.Point(projection.fromLatLngToPoint(position).x, projection.fromLatLngToPoint(position).y - y/(Math.pow(2, this.map.getZoom())));
            return projection.fromPointToLatLng(markerPoint)
        }
        return position;
    }

}

export function trackAction(action: IAction, pk: string, options: ITrackOption) {
    return new TrackAction(action, pk, options)
}