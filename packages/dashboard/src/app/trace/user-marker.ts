import {IUserAnalytics, IUserMap} from "ht-models";
import {HtUpdatePositionTooltip} from "../../utils/map-utls";
import {NameCase} from "../../utils/name-case";
import * as L from "leaflet";
import {HtMapItem} from "./ht-js-map/map-item";

export class UserMarker extends HtMapItem{
    item: L.Marker = L.marker([0,0]);

    constructor(options?) {
        super(options)
    }

    update(item: IUserMap | IUserAnalytics, map: L.Map) {
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

    getBounds(bounds: L.LatLngBounds = L.latLngBounds([])) {
        return bounds.extend(this.item.getLatLng());
    }

    getPosition(item: IUserMap | IUserAnalytics) {
        if(item.last_location && item.last_location.geojson) {
            return L.latLng([item.last_location.geojson.coordinates[1], item.last_location.geojson.coordinates[0]])
        } else {
            return false;
        }
    }

    getInfoContent(item: IUserMap | IUserAnalytics) {
        let name = item.name ? NameCase(item.name) : 'Unknown name';
        return `
<div class="flex-column">
<div class="text-center text-1">${name}</div>
<div class="text-center">${item.display.status_text}</div>
<div class="text-center text2">${item.display.sub_status_text}</div>
</div>
`;
    }
}
