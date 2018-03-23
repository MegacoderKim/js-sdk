import {HtUpdatePositionPopup, SetMap, HtUpdatePositionTooltip} from "../../utils/map-utls";
import {NameCase} from "../../utils/name-case";
import {Color} from "../../utils/color";
import {ITimelineEvent} from "ht-models";
import {TimeString} from "../../utils/time-string";
import {HtMarkerItem} from "./marker-item";
import {latLngBounds, circleMarker, latLng} from "leaflet";

export class EventMarker extends HtMarkerItem {
    item: L.CircleMarker = circleMarker([0,0], {
        radius: 6,
        fillColor: '#fff',
        fillOpacity: 1,
        weight: 3,
        color: Color.grey5,
        pane: 'markerPane'
    });
    tooltipOption = {
      className: 'ht-popup',
      opacity: 1
    };
    // test  = L.marker([0,0]);
    // item  = L.marker([0,0]);
    update(item: ITimelineEvent, map: L.Map) {
        let position = this.getPosition(item);
        // super.updatePosition(item, position, this.getInfoContent(item))
        this.mapUtils.updatePosition(this.item, position, this.getInfoContent(item), this.tooltipOption);

        // this.test.setLatLng(position);
        // SetMap(this.test, map)
    }

    getBounds(bounds: L.LatLngBounds = latLngBounds([])) {
        return bounds.extend(this.item.getLatLng());
    }

    getPosition(item: ITimelineEvent) {
        return latLng([item.position[0], item.position[1]])
    }

    getInfoContent(item: ITimelineEvent) {
        return `<div class="flex-column">
<div class="flex-row text-1 space-around">
    <div class="text-center">${item.info} at ${TimeString(item.recorded_at)}</div>
</div>
</div>`
    }

}
