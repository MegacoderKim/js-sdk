import {LeafletUtils} from "./leaflet-map-utils";
import {HtBounds, HtMap, HtMapType, MapUtils, HtMapItemOptions, SetFocusConfig} from "./interfaces";
import {GoogleMapUtils} from "./google-map-utils";
import {HtPosition} from "ht-js-data";

export class HtMapItem<T> {
  item: any;
  data: T;
  dataClass;
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


  constructor(public mapType: HtMapType, public options: HtMapItemOptions<T> = {}) {
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
  updateItem(data: T) {
    this.id = data['id'];
    this.item['id'] = this.id;
    this.data = data;
    this.isOld = false;
    this.dataClass = this.setDataClass(data)
  }

  setDataClass(data) {
    return null
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

  getInfoContent(data) {
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

  highlight(map: HtMap, data: T, config: SetFocusConfig = {}) {

  }

  unHighlight(map: HtMap) {

  }

  setFocus(map, config: SetFocusConfig = {}) {
    this.mapUtils.setFocus(this.item, map, config)
  }

}

export interface MapData {
  getPosition: () => HtPosition | null,
  isValidMarker: () => boolean,
  style: object,
  fadeStyle: object,
  [key: string]: any
}
