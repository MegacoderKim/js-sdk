import {HtMap, MapUtils} from "../interfaces";
import * as _ from 'underscore';
import {HtMapItem} from "./map-item";

export class HtMapItems {
  itemEntities: {[id: string]: HtMapItem} = {};
  defaultStyle = {};
  fadeStyle = {};
  map;

  constructor(private mapUtils: MapUtils, defaultStyle) {
    if(this.defaultStyle) this.defaultStyle = defaultStyle
  }

  trace(items: any[], map: HtMap, setMap: boolean = false) {
    this.map = map;
    if(items && items.length) this.traceItems(items, setMap);
    this.bustOlditem()
  }

  getItem(data) {
    return new HtMapItem();
  }

  itemEffect(item) {

  }

  traceItemEffect(itemEntities: {}) {

  }

  extendBounds() {
    let bounds = this.mapUtils.extendBounds();
    return _.reduce(this.itemEntities, (bounds, item) => {
      return item.extendBounds(bounds)
    }, bounds);
  }

  private bustOlditem() {
    _.each(this.itemEntities, (item) => {
      if(item.isOld) {
        this.removeItem(item);
      } else {
        item.isOld = true;
      }
    })
  }

  private traceItems(items: any[], setMap: boolean = false) {
    let traceItems = [...items];
    // let lastItem = traceItems.pop();
    _.each(traceItems, (item) => {
      if(this.itemEntities[item.id]) {
        this.updateItem(item, setMap)
      } else {
        this.createItem(item, setMap)
      }
    });
    this.traceItemEffect(this.itemEntities);
    // this.updateItem(lastItem);

  }

  private updateItem(data, setMap: boolean = false) {
    let mapitem = this.itemEntities[data.id];
    if(mapitem) {
      mapitem.updateItem(data);
      mapitem.update(data, this.map);
      if(setMap) mapitem.setMap(this.map)
    } else {
      this.createItem(data, setMap)
    }
  }

  private createItem(data, setMap: boolean = false) {
    let item = this.getItem(data);
    this.itemEffect(item);
    this.itemEntities[data.id] = item;
    this.updateItem(data, setMap)
  }

  private removeItem(item) {
    item.clear();
    let id = item.id;
    if(this.itemEntities[id]) delete this.itemEntities[id];
  }

}