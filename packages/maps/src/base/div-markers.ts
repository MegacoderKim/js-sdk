import {Markers} from "./markers";
import {MapService} from "../map-service";

export abstract class DivMarkers extends Markers {
  abstract getDivContent(data): string;

  getItem(data) {
    return MapService.mapUtils.getDivMarker()
  };
  update({item, data}) {
    let content = this.getDivContent(data);
    MapService.mapUtils.setDivContent(item, content);
    super.update({item, data})
  };
  setStyle(item) {
    let style = this.getStyle();
    MapService.mapUtils.setDivMarkerStyle(item, style)
  };
}