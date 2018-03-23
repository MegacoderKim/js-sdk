import {IUserAnalytics, IUserMap} from "ht-models";
import {HtUpdatePositionTooltip} from "../../utils/map-utls";
import {NameCase} from "../../utils/name-case";
import {HtMapItem} from "./ht-js-map/map-item";
import {latLngBounds, marker, latLng} from "leaflet";

export class UserMarker extends HtMapItem{
    item: L.Marker = marker([0,0]);

    constructor(options?) {
        super(options)
    }

    update(item: IUserAnalytics, map: L.Map) {
        let position = this.getPosition(item);
        if(position) {
            HtUpdatePositionTooltip(this.item, position, this.getInfoContent(item), {
                className: 'ht-popup',
                opacity: 1
            });
            this.item.setLatLng(position);
        }

        this.updateItem(item);

    }

    highlightItem(item) {

    }

    getBounds(bounds: L.LatLngBounds = latLngBounds([])) {
        return bounds.extend(this.item.getLatLng());
    }

    getPosition(item: IUserAnalytics) {
        if(item.location && item.location.geojson) {
            return latLng([item.location.geojson.coordinates[1], item.location.geojson.coordinates[0]])
        } else {
            return false;
        }
    }

    getInfoContent(item: IUserAnalytics) {
        let name = item.name ? NameCase(item.name) : 'Unknown name';
        return `
<div class="flex-column">
<div class="text-center text-1">${name}</div>
<div class="text-center">${item.display.status_text}</div>
<div class="text-center text2">${item.display.last_updated_text}</div>
</div>
`;
    }
}
