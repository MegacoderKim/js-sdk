import * as L from "leaflet";
import "leaflet.heat";

export const leafletHeat = (latlng, options = {}) => {
  // console.log(L.MarkerClusterGroup);
  return L.heatLayer(latlng, options);
};