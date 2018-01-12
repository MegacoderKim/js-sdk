import { HtMarker, MapUtils, SetFocusConfig } from "./interfaces";
import {PolylineUtil} from "./encoded-polyline";
import { HtPosition } from "ht-data";
import {
  circleMarker,
  divIcon,
  latLng,
  latLngBounds,
  map,
  marker,
  point,
  polyline,
  popup,
  tileLayer
} from "leaflet";
import { markerCluster } from "./leaflet.markercluster";

export function ExtendBounds(
  item = null,
  bounds: L.LatLngBounds = latLngBounds([]),
  force: boolean = false
): L.LatLngBounds {
  if ((item && item.getElement()) || force) bounds.extend(item.getLatLng());
  return bounds;
}

export const ExtendBoundsWithPolyline = (
  polyline = null,
  bounds: L.LatLngBounds = latLngBounds([])
): L.LatLngBounds => {
  if (polyline && polyline.getElement()) {
    bounds.extend(polyline.getBounds());
  }
  return bounds;
};

export const SetStyle = (item, style) => {
  if (item.setStyle) item.setStyle(style);
};

export const setCircleStyle = (item, style) => {
  SetStyle(item, style)
};

export const setPolylineStyle = (polyline, style) => {
  polyline.setStyle(style);
};

export const SetMap = (item, map: L.Map) => {
  if ((item && !item.getElement()) || (item && !item.getElement))
    item.addTo(map);
};

export const ClearItem = item => {
  item.remove();
  item.off();
};

export const GetLatlng = ({ lat, lng }: HtPosition = { lat: 0, lng: 0 }) => {
  return latLng(lat, lng);
};

export const setEncodedPath = (polyline, encodedPolyline: string) => {
  var path = PolylineUtil.decode(encodedPolyline);
  return polyline.setLatLngs(path);
};

export const setPathPositionTimeArray = (polyline, positionTimeArray) => {
  return polyline.setLatLngs(positionTimeArray);
};

export function HtUpdatePositionPopup(
  marker,
  position,
  infoContent: string,
  defaultOption: L.PopupOptions = {}
) {
  marker.setLatLng(position);
  HtUpdatePopup(marker, infoContent, defaultOption);
}

export function HtUpdatePopup(marker, infoContent, defaultOption) {
  if (marker.getPopup()) {
    marker.setPopupContent(infoContent);
  } else {
    marker.bindPopup(infoContent, defaultOption);
  }
}

export function HtUpdatePositionTooltip(
  marker,
  position,
  infoContent: string = "",
  defaultOption: L.TooltipOptions = {}
) {
  marker.setLatLng(position);
  if (infoContent) HtUpdateTooltip(marker, infoContent, defaultOption);
}

export function HtUpdateTooltip(marker, infoContent, defaultOption) {
  if (marker.getTooltip()) {
    marker.setTooltipContent(infoContent);
  } else {
    marker.bindTooltip(infoContent, defaultOption);
  }
}

function openTooltip(item: L.Marker, content?: string) {
  if (content) item.setTooltipContent(content);
  item.openTooltip();
}

function closeTooltip(item) {
  item.closeTooltip();
}

function openPopup(item, map, content?: string) {
  if (content) item.setPopupContent(content);
  item.openPopup();
}

function closePopup(item) {
  item.closePopup();
}

function bringToFront(item) {
  item.bringToFront();
}

function setFocus(item, map: L.Map, config: SetFocusConfig) {
  if ((item && item.getElement()) || config.force) {
    let markerCenter = getItemLatlng(item);
    if (config.center) map.panTo(markerCenter, { animate: true, duration: 1 });
    if (config.zoom && config.center) map.setView(markerCenter, config.zoom);
  }
}

function getItemLatlng(item) {
  return item.getLatLng();
}

function renderMap(elem, options) {
  let newmap = map(elem, options);
  tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(newmap);
  return newmap;
}

function updateCirclePosition(
  circle,
  position,
  infoContent: string = "",
  defaultOption: L.TooltipOptions = {}
) {
  HtUpdatePositionTooltip(circle, position, infoContent, defaultOption);
}

function getCircleMarker() {
  return circleMarker([0, 0]);
}

function getMarker() {
  return marker([0, 0]);
}

function getMarkerCluster(map) {
  let cluster = markerCluster();
  map.addLayer(cluster);
  return cluster;
}

function removeClusterMarkers(cluster) {
  cluster.clearLayers();
}

function removeClusterMarker(cluster, marker) {
  cluster.removeLayer(marker);
}

function addMarkersToCluster(cluster, markers) {
  let marker = markers[0];
  cluster.addLayers(markers);
  cluster.refreshClusters(markers);
}

function getPolyline() {
  return polyline([]);
}

function setBounds(map: L.Map, bounds: L.LatLngBounds, options?) {
  map.flyToBounds(bounds, options);
}

function isValidBounds(bounds: L.LatLngBounds) {
  return bounds.isValid();
}

function invalidateSize(map: L.Map) {
  map.invalidateSize();
}

function getPopup(options) {
  return popup(options);
}

function onEvent(item, event, cb) {
  item.on(event, e => {
    cb(e);
  });
}

function openPopupPosition(position, map, content, popup) {
  popup
    .setLatLng(position)
    .setContent(content)
    .openOn(map);
}

function setDivContent(marker, content, options = {}) {
  setDivMarkerStyle(marker, { html: content, ...options });
  // console.error('set div content not implemented')
}

function getDivMarker() {
  return getMarker();
}

function setDivMarkerStyle(item, options) {
  let icon = divIcon({ ...options, className: "", bgPos: point(15, -41) });
  setIcons(item, icon);
}

function setIcons(marker, icon) {
  marker.setIcon(icon);
}

export const LeafletUtils: MapUtils = {
  type: "leaflet",
  setMap: SetMap,
  setStyle: SetStyle,
  setCircleStyle,
  setPolylineStyle,
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
  getPopup,
  setEncodedPath,
  setBounds,
  isValidBounds,
  invalidateSize,
  onEvent,
  openPopupPosition,
  setDivContent,
  getDivMarker,
  setDivMarkerStyle,
  setPathPositionTimeArray
};
