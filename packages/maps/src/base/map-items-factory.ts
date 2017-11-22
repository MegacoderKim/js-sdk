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
}