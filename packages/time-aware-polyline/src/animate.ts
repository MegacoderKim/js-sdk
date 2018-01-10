import {PolylineUtils} from "./polyline";

export class TimeAwareAnimation {
  timeAwarePolyline: PolylineUtils = new PolylineUtils();
  currentTime: string;
  animationPoll;
  animationSpeed: number = 20;
  animationProps = {speedScale: 1, interval: 20};
  constructor() {

  }

  start(timeAwarePolylineString: string) {
    if (!timeAwarePolylineString) return false;
    this.timeAwarePolyline.updateTimeAwarePolyline(timeAwarePolylineString);
    this.handleAnimation(timeAwarePolylineString);
  }

  private handleAnimation(timeAwarePolylineString: string) {
    if (!timeAwarePolylineString) return;
    if(this.animationPoll) this.clearAnimationPoll();
    this.animationPoll = setInterval(() => {
      this.updateCurrentTime();
      this.setPathBearing();
    }, this.animationSpeed)
  }

  private updateCurrentTime() {
    if (this.currentTime) {
      let timeToAdd = this.getTimeToAdd();
      this.currentTime = this.addISOTime(this.currentTime, timeToAdd);
    } else {
      let last = this.timeAwarePolyline.getLatestTime();
      this.currentTime = this.addISOTime(last, -20000);
    }
    this.capTime(() => {
      this.clearAnimationPoll()
    });
  }

  private setPathBearing() {
    let {path, bearing} = this.currentTimePolylineData();
    this.updatePathBearing(path, bearing);
  };

  updatePathBearing(path, bearing) {

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
    let lastTime = new Date(this.timeAwarePolyline.getLatestTime()).getTime();
    let currentTime = new Date(this.currentTime).getTime();
    let totalDuration = (lastTime - currentTime)/ 1000;
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
    let path = polylineData.path.map((array) => {
      return {lat: array[0], lng: array[1]};
    });
    return {path: path, bearing: polylineData.bearing}
  }

  update(timeAwarePolylineString: string) {
    if (!timeAwarePolylineString) return;
    this.timeAwarePolyline.updateTimeAwarePolyline(timeAwarePolylineString);
    if(!this.animationPoll) this.handleAnimation(timeAwarePolylineString);
  }

  clear() {
    this.clearAnimationPoll();
  };

  private addISOTime (time: string, timeToAdd: number): string {
    return new Date(new Date(time).getTime() + timeToAdd).toISOString()
  };
}

