import {Color} from "../../utils/color";
import {ExtendBoundsWithPolyline} from "../../utils/map-utls";
import {AntPath} from "leaflet-ant-path";
import {HtMapItem} from "./ht-js-map/map-item";
import {latLngBounds} from "leaflet";

export class HtActionPolyline extends HtMapItem {
    item: L.Polyline = new AntPath([], {
        dashArray: '5, 7',
        color: Color.mapBg,
        opacity: 1,
        weight: 3,
        delay: 1200,
        pulseColor: Color.grey3
    });

    constructor({defaultStyle}) {
        super({defaultStyle})
    }

    update(item: any, map: L.Map) {
      // console.log("update");
      this.item.setLatLngs(item.path);
      // this.item.addTo(map);
        // this.updateItem(item)
    }

    setMap(map) {
      // console.log("map", this.item);
      // console.log(this.mapUtils);
      // this.update(this.item, map);
      // this.item.setLatLngs([]);
      // this.mapUtils.setMap(this.item, map);

      this.item.addTo(map);
      // console.log(this.item.getElement);
      // console.log("item", this.item);
    }

    getBounds(bounds: L.LatLngBounds = latLngBounds([])) {
        return ExtendBoundsWithPolyline(this.item, bounds)
    }
}
