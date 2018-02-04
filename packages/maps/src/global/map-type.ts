import {HtMapType} from "../map-utils/interfaces";
import {GoogleMapUtilsClass} from "../map-utils/google-map-utils";
import {LeafletMapUtilsClass} from "../map-utils/leaflet-map-utils";

export const mapTypeService = (() => {
  var instance;
  var currentmapType;
  function getMapType(mapType?: HtMapType) {
    switch (mapType) {
      case 'leaflet': {
        return  new LeafletMapUtilsClass()
      }
      case 'google': {
        return new GoogleMapUtilsClass()
      }
      default: {
        return new GoogleMapUtilsClass()
      }
    }
  }
  return {
    getInstance(mapType?: HtMapType) {
      if (!instance || !currentmapType) {
        currentmapType = mapType;
        instance = getMapType(mapType);
      }
      return instance;
    }
  };
})();