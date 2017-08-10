import {IMapOptions, IPlace, ITrackingData} from "./model";
import * as _ from "underscore";
import {CustomRichMarker} from "./trace/custom-marker";
import {Assets, MarkerAssets} from "./assets";
import LatLng = google.maps.LatLng;
import Polyline = google.maps.Polyline;
import {GetLatLng} from "./helpers";
import {DefaultPolylineOptions} from "./defaults";
import UserMarkerAnimation from "./trace/time-aware-animation.data";
import {TimeAwarePolyline} from "./trace/time-aware-polyline";

export class TrackData {
  startMarker: CustomRichMarker = new CustomRichMarker(MarkerAssets.startPosition());
  endMarker: CustomRichMarker = new CustomRichMarker(MarkerAssets.endPosition());
  destinationMarker: CustomRichMarker = new CustomRichMarker(MarkerAssets.endPosition());
  userMarker: CustomRichMarker = new CustomRichMarker();
  mapPolyline: Polyline = new google.maps.Polyline(DefaultPolylineOptions);
  private timeAwareAnimation: UserMarkerAnimation;
  constructor(
    private trackData: ITrackingData,
    private map: google.maps.Map,
    private mapOptions: IMapOptions) {
    if (!trackData || !map) return;
    let vehicleIcon = this.getVehicleAssetDetails(trackData, mapOptions);
    this.timeAwareAnimation = new UserMarkerAnimation(this.map, this.mapPolyline, this.userMarker, vehicleIcon);
    this.track(trackData);
  }

  private getVehicleAssetDetails(
    data: ITrackingData = this.trackData,
    mapOptions: IMapOptions = this.mapOptions) {
    if (mapOptions.vehicleIcon) {
      return {
        src: mapOptions.vehicleIcon.src,
        height: mapOptions.vehicleIcon.height
      }
    }
    let img = Assets.defaultHeroMarker;
    let height = '30px';
    let actionVehicleType = data.vehicleType;
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
      src: img,
      height
    };
  }

  private renderSummaryData(encodedTimeAwarePolyline: string) {
    this.renderEncodedPolyline(encodedTimeAwarePolyline);
    this.renderStartMarker(encodedTimeAwarePolyline);
    this.renderEndMarker(encodedTimeAwarePolyline);
  }

  private renderLiveData(encodedTimeAwarePolyline: string, destination: IPlace) {
    this.timeAwareAnimation.animate(encodedTimeAwarePolyline);
    this.renderDestinationMarker(destination);
    this.renderStartMarker(encodedTimeAwarePolyline);
  }

  private renderEncodedPolyline(encodedTimeAwarePolyline: string) {
    if (encodedTimeAwarePolyline) {
      let polylineArray = this.getTimeAwarePolylinePathArray(encodedTimeAwarePolyline);
      let polylineLatLngArray = polylineArray.map((value) => {
        return (new google.maps.LatLng(value[0], value[1]));
      });
      this.mapPolyline.setPath(polylineLatLngArray);
      if (!this.mapPolyline.getMap()) {
        this.mapPolyline.setMap(this.map);
      }
    }
  }

  private renderStartMarker(encodedTimeAwarePolyline: string) {
    if (encodedTimeAwarePolyline)  {
      let polylineArray = this.getTimeAwarePolylinePathArray(encodedTimeAwarePolyline);
      let startPoint = _.first(polylineArray);
      let startPosition = new google.maps.LatLng(startPoint[0], startPoint[1]);
      this.startMarker.setPosition(startPosition);
      if (!this.startMarker.getMap()) {
        this.startMarker.setMap(this.map);
      }
    }
  }

  private getTimeAwarePolylinePathArray(encodedTimeAwarePolyline: string) {
    if (encodedTimeAwarePolyline) {
      let decodedTimeAwarePolyline = new TimeAwarePolyline(encodedTimeAwarePolyline);
      return decodedTimeAwarePolyline.getPolylinePathDataArray();
    }
    return [];
  }

  private renderEndMarker(encodedTimeAwarePolyline: string) {
    if (encodedTimeAwarePolyline)  {
      let polylineArray = this.getTimeAwarePolylinePathArray(encodedTimeAwarePolyline);
      let endPoint = _.last(polylineArray);
      let endPosition = new google.maps.LatLng(endPoint[0], endPoint[1]);
      this.endMarker.setPosition(endPosition);
      if (!this.endMarker.getMap()) {
        this.endMarker.setMap(this.map);
      }
    }
  }

  private renderDestinationMarker(destination: IPlace) {
    if(destination) {
      let destinationPosition = GetLatLng(destination);
      this.destinationMarker.setPosition(destinationPosition);
      if (!this.destinationMarker.getMap()) {
        this.destinationMarker.setMap(this.map);
      }
    } else {
      this.destinationMarker.clear();
    }
  }

  private clearLiveView() {
    this.timeAwareAnimation.clearAnimationPoll();
    this.destinationMarker.clear();
    this.userMarker.clear();
  }

  private clearSummaryView() {
    this.startMarker.setMap(null);
    this.endMarker.setMap(null);
    this.destinationMarker.setMap(null);
  }

  private fitToBounds(latLngPoints: LatLng[], bottomPadding: number) {
    let bounds = new google.maps.LatLngBounds();
    latLngPoints.forEach((latLngPoint: LatLng) => {
      bounds.extend(latLngPoint);
    });
    this.map.fitBounds(bounds);
    this.fitToBoundsWithBottomPadding(latLngPoints, bottomPadding)
  }

  private fitToBoundsWithBottomPadding(latLngs: LatLng[], bottomPadding) {
    let bounds = new google.maps.LatLngBounds();
    latLngs.forEach((latLng: LatLng) => {
      bounds.extend(latLng);
      if(bottomPadding) {
        bounds.extend(this.latLngYOffset(latLng, bottomPadding));
      }
    });
    this.map.fitBounds(bounds);
  }

  private latLngYOffset(latLng, yOffset) {
    let projection = this.map.getProjection();
    if(projection) {
      let markerPoint = new google.maps.Point(projection.fromLatLngToPoint(latLng).x, projection.fromLatLngToPoint(latLng).y - yOffset/(Math.pow(2, this.map.getZoom())));
      return projection.fromPointToLatLng(markerPoint)
    }
    return latLng;
  }

  private extendBoundsWithBottomOffset(bounds, bottomOffset) {
    let southWest = bounds.getSouthWest();
    let extendedPosition = this.latLngYOffset(southWest, bottomOffset);
    bounds.extend(extendedPosition);
    return bounds;
  }

  private extendBoundsWithTopOffset(bounds, topOffset) {
    let northEast = bounds.getNorthEast();
    let extendedPosition = this.latLngYOffset(northEast, topOffset);
    bounds.extend(extendedPosition);
    return bounds;
  }

  public resetBounds(
    bottomPadding: number = this.mapOptions.bottomPadding || 0,
    topPadding: number = this.mapOptions.topPadding || 0) {
    let isLive = this.trackData.isLive;
    if(!isLive) {
      if (this.mapPolyline && this.mapPolyline.getPath()) {
        let polylineArray = this.mapPolyline.getPath().getArray();
        this.fitToBounds(polylineArray, bottomPadding);
      }
    } else {
      let bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();
      if (this.destinationMarker.getMap() && this.destinationMarker.getPosition()) {
        bounds.extend(this.destinationMarker.getPosition());
      }
      if (this.userMarker.getPosition() && this.userMarker.getMap()) {
        bounds.extend(this.userMarker.getPosition());
      }
      this.map.fitBounds(bounds);
      bounds = this.extendBoundsWithBottomOffset(bounds, bottomPadding);
      bounds = this.extendBoundsWithTopOffset(bounds, topPadding);
      this.map.fitBounds(bounds);
    }
  }

  public clearMap() {
    this.clearLiveView();
    this.clearSummaryView();
    this.mapPolyline.setMap(null);
  }

  public track(trackData: ITrackingData = this.trackData, mapOptions: IMapOptions = this.mapOptions): void {
    this.mapOptions = mapOptions;
    this.trackData = trackData;
    if(trackData.isLive) {
      this.renderLiveData(trackData.encodedTimeAwarePolyline, trackData.destination);
    } else {
      this.clearLiveView();
      this.renderSummaryData(trackData.encodedTimeAwarePolyline);
    }
  }
}

export function trackDataOnMap(data: ITrackingData, map: google.maps.Map, options: IMapOptions) {
  return new TrackData(data, map, options);
}