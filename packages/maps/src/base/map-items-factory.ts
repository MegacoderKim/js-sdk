import {SingleItemMixin} from "../mixins/single-item";
import {PopupMixin} from "../mixins/popup-renderer";
import {DivMarkersMixin} from "../mixins/div-makrers-renderes";
import {CircleMixin} from "../mixins/circle-renderer";
import {MarkersMixin} from "../mixins/marker-renderer";
import {TraceMixin} from "../mixins/trace";
import {DataObservableMixin} from "../mixins/data-observable";
import {PolylinesMixin} from "../mixins/polyline-renderer";
import {ClusterMixin} from "../mixins/clusters";
import * as _ from "underscore";
import {StyleMixin} from "../mixins/styles";
import {DataConfig, StyleObj} from "../interfaces";
import {MarkersBase} from "./markers.factory";
import {PolylinesBase} from "./polylines.factory";
import {DivMarkersBase} from "./div-markers.factory";

export const mapItemsFactory = (baseClass, config: Partial<MapItemsFactoryConfig>) => {
  const defaultConfig: MapItemsFactoryConfig = {
    isCluster: false,
    hasPopup: false,
    isPolyline: false,
    isDiv: false,
    isSingleItem: false,
    isCircle: false,
    hasDataObservable: false
  };
  const finalConfig: MapItemsFactoryConfig = {
    ...defaultConfig,
    ...config
  };

  let mixins = [];
  if(finalConfig.isSingleItem) mixins.push(SingleItemMixin);
  if(finalConfig.hasPopup) mixins.push(PopupMixin);
  if(finalConfig.isCluster) mixins.push(ClusterMixin);
  if(finalConfig.isDiv) mixins.push(DivMarkersMixin);
  if(finalConfig.isCircle) mixins.push(CircleMixin);
  if(finalConfig.isPolyline) mixins.push(PolylinesMixin);
  mixins.push(MarkersMixin);
  mixins.push(StyleMixin);
  mixins.push(TraceMixin);
  if(finalConfig.hasDataObservable) mixins.push(DataObservableMixin);
  return _.compose(...mixins)(baseClass)
};

export interface MapItemsFactoryConfig {
  isCluster: boolean,
  hasPopup: boolean,
  isDiv: boolean,
  isCircle: boolean,
  isSingleItem: boolean,
  hasDataObservable: boolean,
  isPolyline: boolean
};

export const itemsBaseFactory = ({renderConfig, typeConfig, styleObj}: ItemClassFactoryConfig) => {
  let mapTypesBase = {
    polylines: PolylinesBase,
    markers: MarkersBase,
    divMarkers: DivMarkersBase
  };
  typeConfig = typeConfig || {};
  let MapItemBase: any = mapTypesBase.markers;
  if(typeConfig.isDiv) MapItemBase = mapTypesBase.divMarkers;
  if(typeConfig.isPolyline) MapItemBase = mapTypesBase.polylines;
  var base = mapItemsFactory(MapItemBase, typeConfig);
  return base;
};

export const itemsFactory = ({renderConfig, typeConfig, styleObj}: ItemClassFactoryConfig) => {
  var base = itemsBaseFactory({renderConfig, typeConfig, styleObj});
  return new base(renderConfig, styleObj)
};

export interface ItemClassFactoryConfig {
  renderConfig: DataConfig<any>,
  typeConfig?: Partial<MapItemsFactoryConfig>,
  styleObj?: StyleObj,
  name?: string
}