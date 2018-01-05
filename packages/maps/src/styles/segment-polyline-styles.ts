import { Color } from "ht-utility";

export const segmentPolylineStyles = {
  get(type) {
    switch (type) {
      case "google": {
        return {
          default: {
            strokeColor: Color.blue,
            strokeOpacity: 1,
            strokeWeight: 5
          }
        }
      };
      case "leaflet": {
        return {
          default: {
            weight: 5,
            color: Color.blue
          }
        }
      }
    }
  },
};
