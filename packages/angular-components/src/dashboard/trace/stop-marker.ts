import {ExtendBounds} from "../../utils/map-utls";
import {IPlaceline} from "ht-models";
import {HMString} from "../../utils/hm-string";
import {TimeString} from "../../utils/time-string";
import {DateString} from "../../utils/date-string";
import {Color} from "../../utils/color";
import {HtMarkerItem} from "./marker-item";
import {circleMarker, latLng, latLngBounds} from "leaflet";

export class HtMarker extends HtMarkerItem{
    item: L.CircleMarker = circleMarker([0,0], {
        radius: 10,
        fillColor: Color.stop,
        fillOpacity: 1,
        weight: 1,
        color: Color.stopDark,
        pane: 'markerPane'
    });
    defaultStyle = {
      radius: 10,
      fillColor: Color.stop,
      fillOpacity: 1,
      weight: 1,
      color: Color.stopDark,
      pane: 'markerPane'
    };
  highlightStyle = {
    // fillColor: Color.stopDark,
    opacity: 1,
    weight: 3
  };
  fadeStyle: L.CircleMarkerOptions = {
    fillOpacity: 0,
    opacity: 0.1
  };
  tooltipOption = {
    className: 'ht-popup',
    opacity: 1
  };
    // test = L.marker([0, 0]);


    update(item: IPlaceline, map: L.Map) {
        let position = this.getPosition(item);
        this.mapUtils.updatePosition(this.item, position, this.getInfoContent(item), this.tooltipOption);
        // SetMap(this.item, map);
        // this.test.setLatLng(position);
        // SetMap(this.test, map);

    }

    getBounds(bounds: L.LatLngBounds = latLngBounds([])) {
        return ExtendBounds(this.item, bounds)
    }

    highlight(map) {
      // this.item.openTooltip();
      // this.setFocus(map);
      this.setStyle(this.highlightStyle);
      this.bringToFront();
    }

  setFocus(map: L.Map) {
    let center = this.item.getLatLng();
    if(center) map.panTo(center, {animate: true, easeLinearity: 0.58, duration: 1})
  }

    unHighlight(map) {
      this.item.setStyle(this.fadeStyle);
      // this.setStyle(this.fadeStyle)
    }

    getPosition(item: IPlaceline) {
        return latLng([item.place.location.coordinates[1], item.place.location.coordinates[0]])
    }

    getInfoContent(item: IPlaceline): string {
        let durationString = null;
        if(item.started_at && item.ended_at) {
            let durationMin = (new Date(new Date(item.ended_at).getTime() - new Date(item.started_at).getTime()).getTime()) / (1000 * 60);
            durationString = HMString(durationMin)
        }

        let start = TimeString(item.started_at);
        let end = TimeString(item.ended_at);
        let startDate = DateString(item.started_at);
        let startDateShort = DateString(item.started_at, 'short');
        let endDate = DateString(item.ended_at);
        let sameDate = startDate == endDate;
        return `<div class="flex-column">
<strong class="text-muted text-center" style="padding-bottom: 0; color: ${Color.stop}">Stop</strong>
<div style="display: ${start ? 'display' : 'none'}" class="flex-row space-between">
    <div>${start || '--:--'}</div><div>&nbsp; to &nbsp;</div><div class="text-right">${end || '--:--'}</div>
</div>
<div style="${this.htShow(startDate || endDate)}" class="${sameDate || !endDate ? 'space-around' : 'space-between'} text-2 text-muted flex-row">
    <div>${startDateShort}</div><div style="display: ${sameDate || !endDate ? 'none' : 'block'}">${endDate}</div>
</div>
<div style="display: ${durationString ? 'block' : 'none'}" class="text-3 text-center">${durationString}</div>
</div>`
    }

    private htShow(item) {
        return `display: ${item ? 'flex' : 'none'}`
    }
}
