import {HtMarker, MapUtils} from "./interfaces";
import {HtMapItem} from "./map-item";
import * as _ from "underscore";
declare var MarkerClusterer:any;

export function ExtendBounds (item = null, bounds: google.maps.LatLngBounds, force = false) {
  bounds = bounds || new google.maps.LatLngBounds();
  if((item && item.getMap() && item.getPosition) || force) {
    let p = item.getPosition();
    let l = {lat: p.lat(), lng: p.lng()};
    bounds.extend(l);
  }
  if(item && item.getMap() && item.getCenter) {
    bounds.extend(item.getCenter());
  }
  return bounds
};

export const ExtendBoundsWithPolyline = (polyline: google.maps.Polyline = null, bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds()): google.maps.LatLngBounds => {
  if(polyline && polyline.getMap() ) {
    _.each(polyline.getPath().getArray(), p => {
      let l = {lat: p.lat(), lng: p.lng()};
      bounds.extend(l)
    })
  }
  return bounds
};

export const SetStyle = (item, style) => {
  item.setOptions(style)
};

export const SetMap = (item, map: google.maps.Map) => {
  if((item && !item.getMap()) || (item && !item.getMap)) item.setMap(map)
};

export const ClearItem = (item) => {
  item.setMap(null)
};

export const GetLatlng = (lat: number = 0, lng: number = 0) => {
  return new google.maps.LatLng(lat, lng)
};

export const setEncodedPath = (polyline: google.maps.Polyline, encodedPolyline: string) => {
  var path = google.maps.geometry.encoding.decodePath(encodedPolyline);
  return polyline.setPath(path)
};

export function HtUpdatePositionPopup(marker, position, infoContent: string, defaultOption: L.PopupOptions = {}) {
  marker.setPosition(position);
  HtUpdatePopup(marker, infoContent, defaultOption)
}

export function HtUpdatePopup(marker, infoContent, defaultOption) {
  // if(marker.getPopup()) {
  //   marker.setPopupContent(infoContent)
  // } else {
  //   marker.bindPopup(infoContent, defaultOption);
  // }
}

export function HtUpdatePositionTooltip(marker, position, infoContent: string = "", defaultOption: L.TooltipOptions = {}) {
  marker.setPosition(position);
  // if(infoContent) HtUpdateTooltip(marker, infoContent, defaultOption)
}

export function HtUpdateTooltip(marker: HtMarker, infoContent, defaultOption) {
  // if(marker.getTooltip()) {
  //   marker.setTooltipContent(infoContent)
  // } else {
  //   marker.bindTooltip(infoContent, defaultOption);
  // }
}

function openTooltip (item, content?: string) {
  // if(content) item.setTooltipContent(content);
  // item.openTooltip()
}

function closeTooltip(item) {
  // item.closeTooltip()
}

function openPopup(item, content?: string) {
  // if(content) item.setPopupContent(content);
  // item.openPopup()
}

function closePopup(item) {
  // item.closePopup()
}

function bringToFront (item) {
  // item.bringToFront()
}

function setFocus(item, map: google.maps.Map, zoom?, force = false) {
  if((item && item.getMap()) || force) {
    let center =  getItemLatlng(item);
    map.setCenter(center);
    if(zoom) map.setZoom(zoom)
  }
}

function getItemLatlng(item) {
  return item.getPosition()
}

function renderMap(elem, options) {
  return new google.maps.Map(elem, options)
}

function updateCirclePosition(circle, position) {
  circle.setCenter(position)
}

function getCircleMarker() {
  return new google.maps.Marker()
}

function getMarker() {
  return new google.maps.Marker()
}

function  getMarkerCluster(map) {
  // console.log("get", map);
  return new MarkerClusterer(map, [],
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'})
}

function removeClusterMarkers(cluster) {
  cluster.clearMarkers()
}

function removeClusterMarker(cluster, marker) {
  cluster.removeMarker(marker)
}


function addMarkersToCluster(cluster, markers, map) {
  // if(markers.length) console.log(map, "map", markers[0]);
  // cluster.setMap(map);
  _.each(markers, (marker) => {
    // console.log(marker.getPosition().lng());
    cluster.addMarker(marker)
    // if(marker.getPosition()) {
    //   console.log("hit", marker);
    //   cluster.addMarker(marker)
    // }
  })
  // cluster.addMarkers(markers)
  // this.markerCluster.addLayers(markers);
  // this.markerCluster.refreshClusters(markers);
}

function getPolyline() {
  return new google.maps.Polyline()
}

function setBounds(map: google.maps.Map, bounds: google.maps.LatLngBounds, padding: number = 0) {
  let newBounds = new google.maps.LatLngBounds(bounds.getSouthWest(), bounds.getNorthEast());
  map.fitBounds(newBounds)
}

function isValidBounds(bounds: google.maps.LatLngBounds): boolean {
  // console.log(bounds);
  // return !bounds.isEmpty()
  return !getBoundsFix(bounds).isEmpty()
}

function getBoundsFix(bounds) {
  return new google.maps.LatLngBounds(bounds.getSouthWest(), bounds.getNorthEast());
}


function invalidateSize(map) {
  google.maps.event.trigger(map, 'resize');
}

export const GoogleMapUtils: MapUtils = {
  setMap: SetMap,
  setStyle: SetStyle,
  clearItem: ClearItem,
  extendBounds: ExtendBounds,
  extendBoundsWithPolyline: ExtendBoundsWithPolyline,
  getLatlng: GetLatlng,
  updatePosition: HtUpdatePositionTooltip,
  openTooltip,
  closeTooltip,
  openPopup,
  closePopup,
  bringToFront,
  setFocus,
  renderMap,
  updateCirclePosition,
  getCircleMarker,
  getMarker,
  getMarkerCluster,
  addMarkersToCluster,
  removeClusterMarkers,
  removeClusterMarker,
  getPolyline,
  setEncodedPath,
  setBounds,
  isValidBounds,
  invalidateSize
};
