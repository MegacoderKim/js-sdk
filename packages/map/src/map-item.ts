import {LeafletUtils} from "./leaflet-map-utils";
import {HtBounds, HtMap, HtMapType, MapUtils} from "./interfaces";
import {GoogleMapUtils} from "./google-map-utils";

export class HtMapItem {
  item: any;
  data: any;
  isFaded: boolean = false;
  isHighlighted: boolean = false;
  isOld: boolean = false;
  id: string | number;
  defaultStyle;
  googleStyle = {};
  leafletStyle = {};
  mapUtils: MapUtils;
  defaultOptions = {
    mapType: 'leaflet',
    defaultStyle: {}
  };


  constructor(public mapType: HtMapType, options = {}) {
    let newoptions = {...this.defaultOptions, ...options};
    var {defaultStyle} = newoptions;
    if(defaultStyle) this.defaultStyle = defaultStyle;
    this.mapUtils = mapType == 'leaflet' ? LeafletUtils : GoogleMapUtils;
    this.setItem()
  }

  setItem() {

  }

  setMapTypeStyle() {
    let style = this.mapType == 'leaflet' ? this.leafletStyle : this.googleStyle;
    this.setStyle(style);
  }

  update(item, map: HtMap) {

  }

  onUpdate(item, map) {

  }
  //todo update data rename
  updateItem(data) {
    this.id = data.id;
    this.data = data;
    this.isOld = false;
  }

  extendBounds(bounds: HtBounds) {
    bounds = bounds || this.mapUtils.extendBounds();
    return this.mapUtils.extendBounds(this.item, bounds);
  }

  setMap(map) {
    this.mapUtils.setMap(this.item, map)
  }

  clear() {
    if(this.item) this.mapUtils.clearItem(this.item)

  }

  resetHighlight(map) {
    this.reset()
  }

  reset() {
    this.item.isFaded = false;
    this.resetItem();
    this.closeTooltip();
    this.closePopup();
  }

  resetItem() {
    this.setStyle(this.defaultStyle);
  }

  setStyle(style) {
    this.mapUtils.setStyle(this.item, style)
  }

  getItemInfoContent() {
    return this.getInfoContent(this.data)
  }

  getInfoContent(item) {
    return ""
  }

  openPopup(item, content?: string){
    this.mapUtils.openPopup(item, content)
  }

  closePopup() {
    this.mapUtils.closePopup(this.item)
  }

  openTooltip(content?: string){
    this.mapUtils.openTooltip(this.item, content)
  }

  closeTooltip() {
    this.mapUtils.closeTooltip(this.item)
  }

  bringToFront() {
    this.mapUtils.bringToFront(this.item)
  }

  highlight(map: HtMap) {

  }

  unHighlight(map: HtMap) {

  }

  setFocus(map) {
    this.mapUtils.setFocus(this.item, map)
  }

}