import {htUser} from "ht-js-data";
import {mapItemsFactory} from "../base/map-items-factory";
import {MapEntities, MapEntity} from "./interfaces";
import {dataFactory} from "../helpers/data-factory";
import {IUserData} from "ht-models";
import * as _ from "underscore";
var Polyline = require('time-aware-polyline');

export const currentUserFactory = () => {

  let markers = mapItemsFactory({data: htUser});
  return {
    ...markers,
    trace(user) {
      let data = user ? [user] : [];
      markers.trace(data)
    },
    getEntity() {
      if(!this.entities) return null;
      let keys = Object.keys(this.entities);
      if(keys.length == 0) return null;
      let key = keys[0];
      return this.entities[key];
    }
  }
};