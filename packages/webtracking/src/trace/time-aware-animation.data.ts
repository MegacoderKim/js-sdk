import {CustomVehicleIcon, IAction, IMapOptions} from "../model";
import {TimeAwarePolyline} from "./time-aware-polyline";
import {CustomRichMarker} from "./custom-marker";
import * as _ from "underscore";
import * as moment from "moment";
import LatLng = google.maps.LatLng;
import {DefaultPolylineOptions, DefaultVehicleIcon} from "../defaults";
import {addISOTime} from '../helpers';

export default class UserMarkerAnimation {
  timeAwarePolyline: TimeAwarePolyline = new TimeAwarePolyline();
  currentTime: string;
  animationPoll;
  animationSpeed: number = 20;
  animationProps = {speedScale: 1, interval: 20};
  constructor(
    private map: google.maps.Map,
    private mapPolyline: google.maps.Polyline = new google.maps.Polyline(DefaultPolylineOptions),
    private userMarker: CustomRichMarker = new CustomRichMarker(),
    private vehicleIcon: CustomVehicleIcon = DefaultVehicleIcon,
  ) {}

  private handleAnimation() {
    if(this.animationPoll) this.clearAnimationPoll();
    this.animationPoll = setInterval(() => {
      this.updateCurrentTime();
      this.renderCurrentTimeMarkerPolyline();
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

  private renderCurrentTimeMarkerPolyline() {
    let polylineData = this.currentTimePolylineData();
    this.renderPolyline(polylineData.path, this.map);
    this.renderUserMarker(polylineData.bearing, _.last(polylineData.path));
  }

  private setUserMarkerContent(bearing: number) {
    let angle = bearing || 0;
    let vehicleAssetDetails = this.vehicleIcon;
    let content = `<img id ='bike-marker' class='ht-rotate-marker' style='transform: rotate(${angle}deg)' height="${vehicleAssetDetails.height}" src="${vehicleAssetDetails.src}" />`;
    this.userMarker.setMarkerDiv(content);
  }

  private renderUserMarker(bearing: number = 0, position) {
    this.setUserMarkerContent(bearing);
    this.userMarker.setPosition(position);
    if (!this.userMarker.getMap()) {
      this.userMarker.setMap(this.map);
    }
  }

  private renderPolyline(path: LatLng[], map: google.maps.Map) {
    if (path && map) {
      this.mapPolyline.setOptions({
        path: path
      });
      if (!this.mapPolyline.getMap()) {
        this.mapPolyline.setMap(this.map);
      }
    }
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

  private capTime(callback?): boolean {
    if(new Date(this.currentTime) > new Date(this.timeAwarePolyline.getLatestTime())) {
      this.currentTime = this.timeAwarePolyline.getLatestTime();
      if(callback && typeof callback == 'function') callback();
      return true
    } else {
      return false;
    }
  }

  private currentTimePolylineData() {
    let polylineData = this.timeAwarePolyline.getPolylineToTime(this.currentTime);
    let path = _.map(polylineData.path, (array) => {
      return new google.maps.LatLng(array[0], array[1])
    });
    return {path: path, bearing: polylineData.bearing}
  }

  public clearAnimationPoll() {
    clearInterval(this.animationPoll);
    this.animationPoll = null;
  }

  public animate(encodedTimeAwarePolyline: string) {
    if (!encodedTimeAwarePolyline) return;
    this.timeAwarePolyline.updateTimeAwarePolyline(encodedTimeAwarePolyline);
    if(!this.animationPoll) this.handleAnimation();
  }
}