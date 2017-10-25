import {htUser} from "ht-js-data";
// import {MapEntities, Entity} from "./interfaces";
import {MapEntity, mapItemFactory} from "../base/map-item-factory";

export const currentUserFactory = () => {
  let config = {data: htUser};
  return mapItemFactory(config);
};