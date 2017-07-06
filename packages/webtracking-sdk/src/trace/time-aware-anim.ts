import {TimeAwarePolyline} from "./time-aware-polyline";
import {Color} from "../color";
import {IAction, IUser} from "../model";
import * as moment from "moment";
import * as _ from "underscore";
import {UserMarker} from "./user-marker";
import {VehicleAssets} from "../assets";

export class TimeAwareAnim {
    timeAwarePolyline: TimeAwarePolyline = new TimeAwarePolyline();
    map: google.maps.Map;
    userMarker: UserMarker = new UserMarker();
    // marker: google.maps.Marker = new google.maps.Marker();
    started: boolean = false;
    // marker: google.maps.Marker = new RichMarker({flat: true, anchor: RichMarkerPosition.MIDDLE});
    polyline: google.maps.Polyline = new google.maps.Polyline();
    currentTime: string;
    animPoll;
    animSpeed: number = 20;
    animProps = {speedScale: 1, interval: 20};
    positionUpdateCallback;
    action: IAction;
    polylineOption: google.maps.PolygonOptions | null;

    constructor(polylineOpt: google.maps.PolygonOptions = null) {
        this.polylineOption = polylineOpt;
        this.polyline.setOptions(polylineOpt)
    }

    start(action: IAction, map: google.maps.Map) {
        if(!this.started) {
            this.map = map;
            this.action = action;
            if(!this.polylineOption) this.setColor(action);
            this.update(action);
            this.startAnim();
            this.startAnimPoll(action);
            this.started = true;
        }

    }

    update(action: IAction) {
        this.action = action;
        this.timeAwarePolyline.updateTimeAwarePolyline(action.time_aware_polyline);
        this.setColor(action);
        if(!this.animPoll) this.startAnimPoll(action)
    }

    private startAnim() {
        let last = this.timeAwarePolyline.getLatestTime();
        this.currentTime = addISOTime(last, -20000);
        let polylineData = this.currentPolylineData();
        this.polyline.setOptions({
            map: this.map,
            strokeOpacity: 1,
            // path: polylineData.path
        });
        this.userMarker.render(_.last(polylineData.path), this.map);
        // this.marker.setPosition(_.last(polylineData.path));
        // this.marker.setMap(this.map);

    }

    private startAnimPoll(action: IAction) {
        if(this.animPoll) this.clearAnimPoll();
        this.animPoll = setInterval(() => {
            let add = this.getTimeToAdd();
            this.currentTime = addISOTime(this.currentTime, add);
            this.capTime(() => {
                this.clearAnimPoll()
            });
            let polylineData = this.currentPolylineData();
            this.userMarker.setPosition(_.last(polylineData.path))
            // this.marker.setPosition(_.last(polylineData.path));
            this.setMarker(polylineData.bearing, action);
            if(this.positionUpdateCallback && typeof this.positionUpdateCallback == 'function') {
                this.positionUpdateCallback(this.userMarker.getPosition(), this.currentTime)
            }
            this.polyline.setOptions({path: polylineData.path})
        }, this.animSpeed)
    }

    show(map: google.maps.Map) {

    }

    hide() {

    }

    clear() {
        if(this.started) {
            this.clearAnimPoll();
            this.userMarker.clear();
            // this.marker.setMap(null);
            this.polyline.setMap(null);
            this.positionUpdateCallback = null;
        }
    }

    //helper functions
    private getTimeToAdd(): number {
        let totalDuration = moment(this.timeAwarePolyline.getLatestTime()).diff(this.currentTime, 'seconds');
        let factor = 1;
        if(typeof totalDuration == 'number') {
            let mid = 5;
            let power = 2;
            if(totalDuration > mid) {
                factor = Math.pow(totalDuration, power) / Math.pow(mid, power);
            }

        }
        return factor * this.animProps.interval;
    }

    private getVehicleType(action: IAction) {
        let actionVehicleType = action.vehicle_type;
        if (actionVehicleType === 'car' || actionVehicleType === 'motorcycle') {
            return actionVehicleType;
        }
        return 'car';
    }

    private setMarker(bearing, action) {
        //todo
        let angle = bearing || 0;
        let vehicleType = this.getVehicleType(action);
        let content = "<img id='bike-marker' class='ht-rotate-marker' style='transform: rotate(" +
            angle +
            "deg)' height='50px' src='" +
            VehicleAssets[vehicleType] +
            "'>";
        this.userMarker.setMarkerDiv(content)
    }

    private setColor(action: IAction) : void {
        let color = this.polylineOption ? this.polylineOption.strokeColor : Color.grey4;
        this.polyline.setOptions({strokeColor: color})
    }

    private currentPolylineData() {
        let polylineDate = this.timeAwarePolyline.getPolylineToTime(this.currentTime);
        let path = _.map(polylineDate.path, (array) => {
            return new google.maps.LatLng(array[0], array[1])
        });
        return {path: path, bearing: polylineDate.bearing}
    }

    private capTime(callback?): boolean {
        if(new Date(this.currentTime) > new Date(this.timeAwarePolyline.getLatestTime())) {
            this.currentTime = this.timeAwarePolyline.getLatestTime();
            if(callback && typeof callback == 'function') callback();
            return true
        } else {
            return false;
        }
    }

    private clearAnimPoll() {
        clearInterval(this.animPoll);
        this.animPoll = null;
    }

    getBounds(bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds()): google.maps.LatLngBounds {
        bounds.extend(this.userMarker.getPosition());
        return bounds
    }

    getPosition() {
        return this.userMarker.getPosition()
    }
}

interface AnimProps {
    speedScale: number,
    bearing?: number,
    interval: number
}

//helper functions
const addISOTime = (time: string, add: number): string => {
    return moment(time).add(add, 'milliseconds').toISOString();
    // return new Date(new Date(time).getTime() + add).toISOString()
};