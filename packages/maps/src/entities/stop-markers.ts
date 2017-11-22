import {stopStyles} from "../styles/stop-styles";
import {ISegment} from "ht-models";
import {Color, HMString, TimeString, DateString} from "ht-utility";
import {mapItemsFactory} from "../base/map-items-factory";


export abstract class StopMarkers {
  name = "Stop";
  styleObj = stopStyles;

  htShow(item) {
    return `display: ${item ? 'flex' : 'none'}`
  };

  getPosition(data) {
    if(data.location && data.location.geojson) {
      let lat = data.location.geojson.coordinates[1];
      let lng = data.location.geojson.coordinates[0];
      return {lat, lng}
    } else {
      return null;
    }

  };

  getInfoContent(data: ISegment) {
    let durationString = null;
    if(data.started_at && data.ended_at) {
      let durationMin = (new Date(new Date(data.ended_at).getTime() - new Date(data.started_at).getTime()).getTime()) / (1000 * 60);
      durationString = HMString(durationMin)
    }

    let start = TimeString(data.started_at);
    let end = TimeString(data.ended_at);
    let startDate = DateString(data.started_at);
    let startDateShort = DateString(data.started_at, 'short');
    let endDate = DateString(data.ended_at);
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
}

export const StopMarkersTrace = mapItemsFactory(StopMarkers, {
  hasPopup: true,
  isCircle: true,
  hasDataObservable: false
});

