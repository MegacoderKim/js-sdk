import {TimeAwarePolyline} from "./time-aware-polyline";
import {Color} from "../color";
import {IAction, IUser} from "../model";
import * as moment from "moment";
import * as _ from "underscore";

export class TimeAwareAnim {
    timeAwarePolyline: TimeAwarePolyline = new TimeAwarePolyline();
    map: google.maps.Map;
    marker: google.maps.Marker = new google.maps.Marker();
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
            this.startAnimPoll();
            this.started = true;
        }

    }

    update(action: IAction) {
        this.action = action;
        this.timeAwarePolyline.updateTimeAwarePolyline(action.time_aware_polyline);
        this.setColor(action);
        if(!this.animPoll) this.startAnimPoll()
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
        this.marker.setPosition(_.last(polylineData.path));
        this.marker.setMap(this.map);

    }

    private startAnimPoll() {
        if(this.animPoll) this.clearAnimPoll();
        this.animPoll = setInterval(() => {
            let add = this.getTimeToAdd();
            this.currentTime = addISOTime(this.currentTime, add);
            this.capTime(() => {
                this.clearAnimPoll()
            });
            let polylineData = this.currentPolylineData();
            this.marker.setPosition(_.last(polylineData.path));
            this.setMarker(this.action.user, polylineData.bearing, this.action.vehicle_type);
            if(this.positionUpdateCallback && typeof this.positionUpdateCallback == 'function') {
                this.positionUpdateCallback(this.marker.getPosition(), this.currentTime)
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
            this.marker.setMap(null);
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

    private setMarker(user: IUser, bearing, vehicleType) {
        //todo
        // let content: string = 'images/new/marker_normal.png';
        // if(driver.ontime == true || driver.ontime == false) {
        //     content = !driver.ontime ? 'images/new/marker_late.png' : 'images/new/marker_green.png';
        // } else {
        //     content = 'images/new/marker_normal.png';
        // }
        // let angle = bearing || this.action.driver.last_known_location.bearing;
        // // let vehicleType = driver.vehicle_type || 'car';
        // content = "<img id='bike-marker' class='ht-rotate-marker' style='transform: rotate(" +
        //     angle +
        //     "deg)' height='50px' src='" +
        //     VehicleIcon[vehicleType] +
        //     "'>";
        // //content = 'images/new/marker_late.png';
        // let imageUrl = driver.photo || 'images/missing.png';
        // this.marker.setContent(content)
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
        bounds.extend(this.marker.getPosition());
        return bounds
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