import {IMapOptions, ITrackedData, ITrackingData, ITrackingDataOptions} from "./model";
import {RenderGoogleMap} from "./helpers";
import {TrackData} from "./track-data";

export class TrackByData {
  map: google.maps.Map;
  public trackedData: ITrackedData = {};

  constructor(
    public dataArray: ITrackingData[],
    public options: ITrackingDataOptions
  ) {
    this.renderMap();
    this.track(dataArray);
    if (this.options.onReady) {
      this.options.onReady(this.trackedData, dataArray, this.map);
    }
  }

  renderMap() {
    this.map = RenderGoogleMap(this.options.mapId, this.options.mapOptions);
  }

  public track(dataArray: ITrackingData[], mapOptions: IMapOptions = this.options.mapOptions) {
    dataArray.forEach((data: ITrackingData) => {
      let trackingData = data;
      if (this.trackedData[trackingData.id]) {
        this.trackedData[trackingData.id].track(trackingData);
      } else {
        this.trackedData[trackingData.id] = new TrackData(trackingData, this.map, mapOptions);
      }
    });
  }
}

export function trackByData(dataArray: ITrackingData[], options: ITrackingDataOptions) {
  return new TrackByData(dataArray, options);
}