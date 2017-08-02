import {Color} from "../color";
import {IAction, IMapOptions} from "../model";
import {TimeAwarePolyline} from "./time-aware-polyline";
import {CustomRichMarker} from "./custom-marker";
import * as _ from "underscore";
import * as moment from "moment";
import {Assets} from "../assets";
import LatLng = google.maps.LatLng;

export class TimeAwareAnimation {
  timeAwarePolyline: TimeAwarePolyline = new TimeAwarePolyline();
  // polyline: google.maps.Polyline = new google.maps.Polyline();
  isAnimationStarted: boolean = false;
  // userMarker: CustomRichMarker = new CustomRichMarker();
  currentTime: string;
  animationPoll;
  animationSpeed: number = 20;
  animationProps = {speedScale: 1, interval: 20};
  constructor(
    private map: google.maps.Map,
    private action: IAction,
    private userMarker: CustomRichMarker,
    private polyline: google.maps.Polyline,
    private options?: IMapOptions
  ) {
    this.polyline.setOptions({
      strokeColor: Color.htPink,
      strokeOpacity: 1
    });
  }

  start(action: IAction) {
    if (!action.time_aware_polyline) return;
    this.action = action;
    this.timeAwarePolyline.updateTimeAwarePolyline(action.time_aware_polyline);
    this.handleAnimation(action);
  }

  private handleAnimation(action: IAction) {
    if (!action.time_aware_polyline) return;
    if(this.animationPoll) this.clearAnimationPoll();
    this.animationPoll = setInterval(() => {
      this.updateCurrentTime();
      this.renderCurrentTimeMarkerPolyline(action);
    }, this.animationSpeed)
  }

  private updateCurrentTime() {
    if (this.currentTime) {
      let timeToAdd = this.getTimeToAdd();
      this.currentTime = addISOTime(this.currentTime, timeToAdd);
    } else {
      let last = this.timeAwarePolyline.getLatestTime();
      this.currentTime = addISOTime(last, -20000);
    }
    this.capTime(() => {
      this.clearAnimationPoll()
    });
  }

  private renderCurrentTimeMarkerPolyline(action: IAction) {
    let polylineData = this.currentTimePolylineData();
    this.renderPolyline(polylineData.path, this.map);
    this.renderUserMarker(action, polylineData.bearing, _.last(polylineData.path));
  }

  private setUserMarkerContent(bearing: number, action: IAction) {
    let angle = bearing || 0;
    let vehicleAssetDetails = this.getVehicleAssetDetails(action);
    let content = `<img id ='bike-marker' class='ht-rotate-marker' style='transform: rotate(${angle}deg)' height="${vehicleAssetDetails.height}" src="${vehicleAssetDetails.img}" />`;
    this.userMarker.setMarkerDiv(content);
  }

  private renderUserMarker(action: IAction, bearing: number = 0, position) {
    this.setUserMarkerContent(bearing, action);
    this.userMarker.setPosition(position);
    if (!this.userMarker.getMap()) {
      this.userMarker.setMap(this.map);
    }
  }

  private renderPolyline(path: LatLng[], map: google.maps.Map) {
    if (path && map) {
      this.polyline.setOptions({
        path: path
      });
      if (!this.polyline.getMap()) {
        this.polyline.setMap(this.map);
      }
    }
  }

  private getVehicleAssetDetails(action: IAction) {
    if (this.options.vehicleIcon) {
      return {
        img: this.options.vehicleIcon.src,
        height: this.options.vehicleIcon.height
      }
    }
    let img = Assets.defaultHeroMarker;
    let height = '30px';
    let actionVehicleType = action.vehicle_type;
    switch(actionVehicleType) {
      case 'car':
        img = Assets.vehicleCar;
        height = '50px';
        break;
      case 'motorcycle':
        img = Assets.motorcycle;
        height = '50px';
        break;
      default:
        img = Assets.defaultHeroMarker;
        break;
    }
    return {
      img,
      height
    };
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

  clearAnimationPoll() {
    clearInterval(this.animationPoll);
    this.animationPoll = null;
  }

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
    return factor * this.animationProps.interval;
  }

  private currentTimePolylineData() {
    let polylineData = this.timeAwarePolyline.getPolylineToTime(this.currentTime);
    let path = _.map(polylineData.path, (array) => {
      return new google.maps.LatLng(array[0], array[1])
    });
    return {path: path, bearing: polylineData.bearing}
  }

  update(action: IAction) {
    this.action = action;
    if (!action.time_aware_polyline) return;
    this.timeAwarePolyline.updateTimeAwarePolyline(action.time_aware_polyline);
    if(!this.animationPoll) this.handleAnimation(action);
  }

  extendBoundsWithUserMarker(bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds()): google.maps.LatLngBounds {
      bounds.extend(this.userMarker.getPosition());
      return bounds
  }

  getUserMarker() {
    return this.userMarker;
  }

  clear() {
    this.clearAnimationPoll();
    this.userMarker.clear();
    this.polyline.setMap(null);
  }
}

//helper functions
const addISOTime = (time: string, timeToAdd: number): string => {
  return moment(time).add(timeToAdd, 'milliseconds').toISOString();
};