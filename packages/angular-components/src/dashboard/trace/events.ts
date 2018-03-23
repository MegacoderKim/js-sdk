import {MapItems} from "./map-items";
import {Color} from "../../utils/color";
import {EventMarker} from "./event-marker";
import {latLngBounds} from "leaflet";

export class EventMarkers extends MapItems {
    itemEntities: {[id: string]: EventMarker} = {};

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
    }
    getItem(item) {
        return new EventMarker()
    }

    getBounds(bounds: L.LatLngBounds = latLngBounds([])) {
        // _.each(this.itemEntities, (item: ActionMarker) => {
        //     item.getBounds(bounds)
        // });
        return bounds
    }
}
