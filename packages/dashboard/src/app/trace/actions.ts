import {MapItems} from "./map-items";
import * as _ from "underscore";
import {Color} from "../../utils/color";
import {ActionMarker} from "./action-marker";
import {SetEncodedPath} from "../../utils/map-utls";
import * as L from "leaflet";
import {AntPath} from "leaflet-ant-path";

export class ActionMarkers extends MapItems {
    itemEntities: {[id: string]: ActionMarker} = {};
  defaultPolylineStyle = {
    dashArray: '5, 7',
    color: Color.blueLight,
    opacity: 1,
    weight: 3,
    delay: 2000,
    pulseColor: Color.blue,
    pane: 'markerPane'
  };
    actionPolyline: L.Polyline = new AntPath([], this.defaultPolylineStyle);

    getItem(item) {
        let actionMarker = new ActionMarker(true);
        return actionMarker;
    }

    getBounds(bounds: L.LatLngBounds = L.latLngBounds([])) {
        _.each(this.itemEntities, (item: ActionMarker) => {
            item.getBounds(bounds)
        });
        return bounds
    }

    highlightItem(item) {
      this.renderActionPolyline(item);
      super.highlightItem(item)
    }

    resetHighlights() {
      this.actionPolyline.remove();
      super.resetHighlights()
    }

    private renderActionPolyline(item) {
      let pulseColor = item.data.display.is_late ? Color.red : Color.green;
      let color = item.data.display.is_late ? Color.redLight : Color.greenLight;
      let style = {...this.defaultPolylineStyle, color, pulseColor };
      this.actionPolyline =  new AntPath([], style);
      this.actionPolyline.addTo(this.map);
      if(item.data.route) SetEncodedPath(this.actionPolyline, item.data.route);
    }
}
