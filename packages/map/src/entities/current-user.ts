import {htUser} from "ht-js-data";
import {MapEntity, mapItemFactory} from "../base/map-item-factory";
import {IUserData} from "../../../models/src/user";

export const currentUserFactory = (): MapEntity<IUserData> => {
  let config = {data: htUser};
  return mapItemFactory(config);
};