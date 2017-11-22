import {Styles} from "../mixins/styles";
import {Trace} from "../mixins/trace";
import {StyleObj} from "../helpers/styles-factory";
import {HtBounds, HtMap} from "../map-utils";
import {Entities, Entity} from "../entities/interfaces";
import {MapService} from "../map-service";
import {HtPosition} from "ht-data";
import * as _ from "underscore";
import {PopupRenderer} from "../mixins/popup-renderer";
import {Clusters} from "../mixins/clusters";

export abstract class Markers implements Styles, Trace, PopupRenderer, Clusters {
  abstract styleObj: StyleObj;
  map: HtMap;
  styleType: string;
  getStyle: (styleType?) => object;
  entities: Entities<any> = {};
  onClick: (entity) => void;
  // setMap: (item, map) => void;
  traceEffect: () => void;
  removeData: (data) => void;
  trace: (data, map?) => any;
  bustOldItem: () => any;
  extendBounds: (bounds) => HtBounds;

  toSetMap: boolean;
  abstract getInfoContent(data): string;
  addPopup: () => void;
  abstract getPosition(data): HtPosition;
  setPopup: (id) => void;
  popup;
  onMouseLeave: (trace) => void;
  onMouseEnter: (trace) => void;
  cluster;
  addCluster: () => void;

  getItem(data) {
    return MapService.mapUtils.getMarker()
  };

  getBounds(item, bounds?) {
    return MapService.mapUtils.extendBounds(item, bounds)
  };

  update({item, data}) {
    let position = this.getPosition(data);
    if(position) MapService.mapUtils.updatePosition(item, position);
  };

  removeItem(item) {
    this.cluster && MapService.mapUtils.removeClusterMarker(this.cluster, item);
    MapService.mapUtils.clearItem(item);
  };

  removeAll(entities) {
    this.cluster && MapService.mapUtils.removeClusterMarkers(this.cluster);
    _.each(entities, (entity: any) => {
      this.removeItem(entity.item)
    });
    this.entities = {}

  };

  setStyle(item) {
    let style = this.getStyle();
    MapService.mapUtils.setStyle(item, style)
  };

  remove(data) {
    let id = data.id;
    if(this.entities[id]) delete this.entities[id];
  };


}