import {IAction, IMapOptions} from "./model";
import * as _ from "underscore";
import {CustomRichMarker} from "./trace/custom-marker";
import {MarkerAssets} from "./assets";
import LatLng = google.maps.LatLng;
import Polyline = google.maps.Polyline;
import {TimeAwareAnimation} from "./trace/time-aware-animation";
import {GetLatLng} from "./helpers";
import {DefaultPolylineOptions} from "./defaults";

export class TrackedAction {
  startMarker: CustomRichMarker = new CustomRichMarker(MarkerAssets.startPosition());
  endMarker: CustomRichMarker = new CustomRichMarker(MarkerAssets.endPosition());
  destinationMarker: CustomRichMarker = new CustomRichMarker(MarkerAssets.endPosition());
  mapPolyline: Polyline = new google.maps.Polyline(DefaultPolylineOptions);
  userMarker: CustomRichMarker = new CustomRichMarker();
  private timeAwareAnimation: TimeAwareAnimation;
  constructor(
    private action: IAction,
    private map: google.maps.Map,
    private mapOptions: IMapOptions) {
    if (!action || !map) return;
    this.timeAwareAnimation = new TimeAwareAnimation(this.map, action, this.userMarker, this.mapPolyline, mapOptions);
    this.showOnMap(action);
  }

  showOnMap(action: IAction = this.action): void {
    if(action.display.show_summary) {
      this.renderSummary(action);
    } else {
      this.renderLive(action);
    }
  }

  private renderSummary(action: IAction = this.action) {
    this.renderEncodedPolyline(action);
    this.renderStartMarker(action);
    this.renderEndMarker(action);
  }

  private renderLive(action: IAction = this.action) {
    this.timeAwareAnimation.start(action);
    this.renderDestinationMarker(action);
    this.renderStartMarker(action);
  }

  private renderEncodedPolyline(action: IAction) {
    if (action.encoded_polyline) {
      let polylineArray = google.maps.geometry.encoding.decodePath(action.encoded_polyline);
      this.mapPolyline.setPath(polylineArray);
      if (!this.mapPolyline.getMap()) {
        this.mapPolyline.setMap(this.map);
      }
    }
  }

  private renderStartMarker(action: IAction = this.action) {
    if (action.encoded_polyline)  {
      let polylineArray = google.maps.geometry.encoding.decodePath(action.encoded_polyline);
      let startPoint = _.first(polylineArray);
      let startPosition = new google.maps.LatLng(startPoint.lat(), startPoint.lng());
      this.startMarker.setPosition(startPosition);
      if (!this.startMarker.getMap()) {
        this.startMarker.setMap(this.map);
      }
    }
  }

  private renderEndMarker(action: IAction = this.action) {
    if (this.action.encoded_polyline)  {
      let polylineArray = google.maps.geometry.encoding.decodePath(action.encoded_polyline);
      let endPoint = _.last(polylineArray);
      let endPosition = new google.maps.LatLng(endPoint.lat(), endPoint.lng());
      this.endMarker.setPosition(endPosition);
      if (!this.endMarker.getMap()) {
        this.endMarker.setMap(this.map);
      }
    }
  }

  private renderDestinationMarker(action: IAction = this.action) {
    let finalPlace = action.completed_place || action.expected_place;
    if(finalPlace) {
      let destinationPosition = GetLatLng(finalPlace);
      this.destinationMarker.setPosition(destinationPosition);
      if (!this.destinationMarker.getMap()) {
        this.destinationMarker.setMap(this.map);
      }
      // this.destinationMarker.render(destinationPosition, this.map);
    } else {
      this.destinationMarker.clear();
    }
  }

  private clearLiveView() {
    this.timeAwareAnimation.clearAnimationPoll();
    this.destinationMarker.clear();
    this.userMarker.clear();
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

  resetBounds(
    bottomPadding: number = this.mapOptions.bottomPadding || 0,
    topPadding: number = this.mapOptions.topPadding || 0) {
    if(this.action.display.show_summary) {
      if (this.action.encoded_polyline) {
        let polylineArray = google.maps.geometry.encoding.decodePath(this.action.encoded_polyline);
        this.fitToBounds(polylineArray, bottomPadding);
      }
    } else {
      let bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();
      if (this.destinationMarker.getMap() && this.destinationMarker.getPosition()) {
        bounds.extend(this.destinationMarker.getPosition());
      }
      let userMarker = this.timeAwareAnimation.getUserMarker();
      if (userMarker.getPosition() && userMarker.getMap()) {
        bounds.extend(userMarker.getPosition());
      }
      this.map.fitBounds(bounds);
      bounds = this.extendBoundsWithBottomOffset(bounds, bottomPadding);
      bounds = this.extendBoundsWithTopOffset(bounds, topPadding);
      this.map.fitBounds(bounds);
    }
  }

  update(action: IAction) {
    this.action = action;
    if(action.display.show_summary) {
      this.clearLiveView();
      this.renderSummary(action);
    } else {
      this.renderDestinationMarker(action);
      this.renderStartMarker(action);
      this.timeAwareAnimation.update(action);
    }
  }

  updateMapOptions(mapOptions: IMapOptions) {
    this.mapOptions = {
      ...this.mapOptions,
      ...mapOptions
    };
  }

  hideOnMap() {
    this.clearLiveView();
    this.startMarker.setMap(null);
    this.endMarker.setMap(null);
    this.destinationMarker.setMap(null);
    this.mapPolyline.setMap(null);
    this.userMarker.setMap(null);
  }

  updateUserMarkerIcon(icon: string) {
    this.mapOptions = {
      ...this.mapOptions,
      vehicleIcon: {
        ...this.mapOptions.vehicleIcon,
        src: icon
      }
    }
  }
}

export function trackActionOnMap(action: IAction, map: google.maps.Map, options: IMapOptions) {
  return new TrackedAction(action, map, options);
}