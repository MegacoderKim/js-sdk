import {MapItems} from "./map-items";
import {HtMarker} from "./stop-marker";
import * as _ from "underscore";
import {Color} from "../../utils/color";
import * as L from "leaflet";

export class StopMarkers extends MapItems {
    items: {[id: string]: HtMarker};

    fadeStyle: L.CircleMarkerOptions = {
        fillOpacity: 0.25,
        opacity: 0.3
    };
    defaultStyle = {
        radius: 10,
        fillColor: Color.stop,
        fillOpacity: 1,
        weight: 1,
        opacity: 1,
        color: Color.stopDark,
        pane: 'markerPane'
    };
    highlightStyle = {
        // fillColor: Color.stopDark,
        opacity: 1,
        weight: 3
    };
    getItem(item) {
        return new HtMarker()
    }

    getBounds(bounds: L.LatLngBounds = L.latLngBounds([])) {
        _.each(this.itemEntities, (item: HtMarker) => {
            item.getBounds(bounds)
        });
        return bounds
    }
}
